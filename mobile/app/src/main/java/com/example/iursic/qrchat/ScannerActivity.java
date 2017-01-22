package com.example.iursic.qrchat;

import android.app.Activity;
import android.content.Intent;
import android.nfc.Tag;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.content.SharedPreferences;
import android.util.Log;

import com.google.zxing.Result;

import me.dm7.barcodescanner.zxing.ZXingScannerView;


public class ScannerActivity extends Activity implements ZXingScannerView.ResultHandler {

    private ZXingScannerView mScannerView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        mScannerView = new ZXingScannerView(this);   // Programmatically initialize the scanner view
        setContentView(mScannerView);
    }

    @Override
    public void onResume() {
        super.onResume();
        mScannerView.setResultHandler(this); // Register ourselves as a handler for scan results.
        mScannerView.startCamera();          // Start camera on resume
    }

    @Override
    public void onPause() {
        super.onPause();
        mScannerView.stopCamera();           // Stop camera on pause
    }

    @Override
    public void handleResult(Result rawResult) {
        // Do something with the result here
        SharedPreferences settings = getSharedPreferences("facebook", 0);
        SharedPreferences.Editor editor = settings.edit();
        editor.putString("text",rawResult.getText());
        editor.putString("barcodeformat",rawResult.getBarcodeFormat().toString());
        editor.commit();

        // If you would like to resume scanning, call this method below:
        Intent intent = new Intent(ScannerActivity.this,HomeActivity.class);
        startActivity(intent);
    }
}
