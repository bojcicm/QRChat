package com.example.iursic.qrchat;

import android.app.Activity;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.widget.TextView;

import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.IgnoreExtraProperties;

import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.MalformedURLException;
import java.net.URL;
import java.nio.charset.MalformedInputException;

import javax.net.ssl.HttpsURLConnection;

/**
 * Created by iursic on 22/10/16.
 */

public class HomeActivity extends Activity {

    private TextView user_id;
    private TextView auth_token;
    private TextView text;
    private TextView barcode_format;
    private DatabaseReference mDatabase;

    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.home_layout);
        user_id = (TextView) findViewById(R.id.user_id);
        auth_token = (TextView) findViewById(R.id.auth_token);
        text = (TextView) findViewById(R.id.text);
        barcode_format = (TextView) findViewById(R.id.barcode_format);
        SharedPreferences settings = getSharedPreferences("facebook", 0);
        String id = settings.getString("user_id",null);
        String token = settings.getString("token",null);
        String textString = "KZCysQwW-ibR6Gx6RMU";//settings.getString("text",null);
        String barcodeformat = settings.getString("barcodeformat",null);
        mDatabase = FirebaseDatabase.getInstance().getReference();
        writeNewUser(id,token,textString);

       /* try {
            URL url = new URL("https://httpbin.org/post");
            HttpsURLConnection connection= (HttpsURLConnection)url.openConnection();
            String urlParameters = "user_id="+ id+"&token="+token+"&text="+textString;
            connection.setRequestMethod("POST");
            connection.setRequestProperty("USER-AGENT", "Mozilla/5.0");
            connection.setRequestProperty("ACCEPT-LANGUAGE", "en-US,en;0.5");
            connection.setDoOutput(true);
            DataOutputStream dStream = new DataOutputStream(connection.getOutputStream());
            dStream.writeBytes(urlParameters);
            dStream.flush();
            dStream.close();

            int responseCode = connection.getResponseCode();
            String output = "Request URL: "+ url;
            output+= System.getProperty("line.separator")+ "Request Parameters "+ urlParameters;
            output+= System.getProperty("line.separator")+ "Response code "+ responseCode;

            BufferedReader br = new BufferedReader(new InputStreamReader(connection.getInputStream()));
            String line = "";
            StringBuilder responseOutput = new StringBuilder();

            while((line = br.readLine()) != null){
                responseOutput.append(line);
            }
            br.close();

            output+= System.getProperty("line.separator")+ responseOutput.toString();

            user_id.setText(output);

        }catch(MalformedURLException e){
            e.printStackTrace();
        }catch(IOException e){
            e.printStackTrace();
        }*/
    }

    @IgnoreExtraProperties
    public class User {

        public String id;
        public String token;

        public User() {
            // Default constructor required for calls to DataSnapshot.getValue(User.class)
        }

        public User(String id, String token) {
            this.id = id;
            this.token = token;
        }

    }

    private void writeNewUser(String id, String token, String guid) {

        User user = new User(id, token);
        mDatabase.child("users").child(guid).child("userId").setValue(user.id);
        mDatabase.child("users").child(guid).child("tokenData").setValue(user.token);
    }

}
