package com.example.iursic.qrchat;

import android.app.Activity;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.widget.TextView;

/**
 * Created by iursic on 22/10/16.
 */

public class HomeActivity extends Activity {

    private TextView user_id;
    private TextView auth_token;
    private TextView text;
    private TextView barcode_format;

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
        String textString = settings.getString("text",null);
        String barcodeformat = settings.getString("barcodeformat",null);
        user_id.setText("USER ID: " + id);
        auth_token.setText("AUTH TOKEN: " + token);
        text.setText("Text: "+ textString);
        barcode_format.setText("Barcode format: " + barcodeformat);

    }

}
