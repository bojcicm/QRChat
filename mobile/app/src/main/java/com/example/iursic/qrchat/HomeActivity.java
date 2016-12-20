package com.example.iursic.qrchat;

import android.app.Activity;
import android.content.SharedPreferences;
import android.os.Bundle;
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
    private TextView auth_token;
    private TextView text;
    private DatabaseReference mDatabase;

    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.home_layout);
        user_id = (TextView) findViewById(R.id.user_id);
        auth_token = (TextView) findViewById(R.id.auth_token);
        text = (TextView) findViewById(R.id.text);
        SharedPreferences settings = getSharedPreferences("facebook", 0);
        String id = settings.getString("user_id",null);
        String token = settings.getString("token",null);
        String textString = settings.getString("text",null);
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
    }

}
