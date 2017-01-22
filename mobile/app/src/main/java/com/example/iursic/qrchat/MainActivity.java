package com.example.iursic.qrchat;

import android.content.Intent;
import android.content.SharedPreferences;
import android.provider.Settings;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.text.Editable;
import android.text.TextWatcher;
import android.util.Log;
import android.view.Menu;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;

import com.facebook.CallbackManager;
import com.facebook.FacebookCallback;
import com.facebook.FacebookException;
import com.facebook.FacebookSdk;
import com.facebook.appevents.AppEventsLogger;
import com.facebook.login.LoginResult;
import com.facebook.login.widget.LoginButton;

public class MainActivity extends AppCompatActivity {

    private CallbackManager callbackManager;
    private TextView info;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        facebookSDKInitialize();
        setContentView(R.layout.activity_main);
        if( getIntent().getBooleanExtra("Exit me", false)){
            finish();
            System.exit(0);
            return;
        }
        info = (TextView)findViewById(R.id.info);
        LoginButton loginButton = (LoginButton) findViewById(R.id.login_button);
        loginButton.setReadPermissions("email");
        loginButton.addTextChangedListener(new TextWatcher() {
            @Override
            public void beforeTextChanged(CharSequence charSequence, int i, int i1, int i2) {

            }

            @Override
            public void onTextChanged(CharSequence charSequence, int i, int i1, int i2) {

            }

            @Override
            public void afterTextChanged(Editable editable) {
                Button continueButton = (Button) findViewById(R.id.continue_button);
                String comapreStringEng = new String("Log out");
                String comapreStringHrv = new String("Odjavi se");

                if(editable.toString().equals(comapreStringEng) || editable.toString().equals(comapreStringHrv)){
                    continueButton.setVisibility(View.VISIBLE);
                }else{
                    continueButton.setVisibility(View.INVISIBLE);
                }
            }
        });
        getLoginDetails(loginButton);
    }

    @Override
    protected void onResume() {
        super.onResume();
        // Logs 'install' and 'app activate' App Events.<br />
        LoginButton loginButton = (LoginButton) findViewById(R.id.login_button);
        AppEventsLogger.activateApp(this);
    }

    @Override
    protected void onPause() {
        super.onPause();
         // Logs 'app deactivate' App Event.<br />
        AppEventsLogger.deactivateApp(this);
    }

    protected void facebookSDKInitialize() {
        FacebookSdk.sdkInitialize(getApplicationContext());
        callbackManager = CallbackManager.Factory.create();
    }

    protected void getLoginDetails(final LoginButton login_button){
         // Callback registration
        login_button.registerCallback(callbackManager, new FacebookCallback<LoginResult>() {
            @Override
            public void onSuccess(LoginResult loginResult) {
                Intent intent = new Intent(MainActivity.this, HomeActivity.class);
                SharedPreferences settings = getSharedPreferences("facebook", 0);
                SharedPreferences.Editor editor = settings.edit();
                editor.putString("user_id",loginResult.getAccessToken().getUserId());
                editor.putString("token",loginResult.getAccessToken().getToken());
                editor.commit();
                startActivity(intent);
            }
            @Override
            public void onCancel() {
                info.setText("Login attempt canceled.");
            }
            @Override
            public void onError(FacebookException exception) {
                info.setText("Login attempt failed.");
            }
        });
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
            super.onActivityResult(requestCode, resultCode, data);
            callbackManager.onActivityResult(requestCode, resultCode, data);
    }

    public void startScanner(View view){
        Intent intent = new Intent(MainActivity.this, HomeActivity.class);
        startActivity(intent);
    }

    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        // getMenuInflater().inflate(R.menu.menu_main, menu);
        return true;
    }
}
