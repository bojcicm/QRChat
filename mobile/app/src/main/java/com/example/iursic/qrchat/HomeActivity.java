package com.example.iursic.qrchat;

import android.app.Activity;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;

import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.Exclude;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.IgnoreExtraProperties;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by iursic on 22/10/16.
 */

public class HomeActivity extends Activity {

    private TextView user_id;
    private TextView data;
    private DatabaseReference mDatabase;

    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.home_layout);
        user_id = (TextView) findViewById(R.id.user_id);
        data = (TextView) findViewById(R.id.data);
        SharedPreferences settings = getSharedPreferences("facebook", 0);
        String id = settings.getString("user_id",null);
        String token = settings.getString("token",null);
        String textString = settings.getString("text",null);
        data.setText("USER ID: " + id + System.getProperty("line.separator") + System.getProperty("line.separator") + "AUTH TOKEN: " + token + System.getProperty("line.separator") + System.getProperty("line.separator") + "CODE: "+ textString );
        mDatabase = FirebaseDatabase.getInstance().getReference();
        WriteNewUser(id,token,textString);
    }

    @IgnoreExtraProperties
    public class User {

        public String facebookUserId;
        public String authToken;

        public User() {}

        public User(String id, String token) {
            this.facebookUserId = id;
            this.authToken = token;
        }

        @Exclude
        public Map<String, Object> toMap() {
            HashMap<String, Object> result = new HashMap<>();
            result.put("facebookUserId", facebookUserId);
            result.put("authToken", authToken);

            return result;
        }

    }

    private void WriteNewUser(String id, String token, String guid) {

        User user = new User(id, token);
        Map<String, Object> userValues = user.toMap();
        Map<String, Object> childUpdates = new HashMap<>();
        childUpdates.put("/users/"+ guid+"/tokenData", userValues);
        mDatabase.updateChildren(childUpdates);
        user_id.setText("Message: You are authorized and you can chat now");
    }

    public void LoginScreen (View view){
        Intent intent = new Intent(HomeActivity.this, ScannerActivity.class );
        startActivity(intent);
    }

}
