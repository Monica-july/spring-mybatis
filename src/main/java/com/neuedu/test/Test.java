package com.neuedu.test;

import java.io.File;
import java.io.IOException;
import java.text.DecimalFormat;

public class Test {
    public static void main(String[] args) {
        DecimalFormat decimalFormat = new DecimalFormat("0.00");
        Integer a = 0;
        double b = 0.0;
        System.out.println(decimalFormat.format(Double.valueOf(a)/b));
    }
}
