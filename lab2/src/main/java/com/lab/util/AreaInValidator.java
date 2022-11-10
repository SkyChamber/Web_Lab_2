package com.lab.util;

public class AreaInValidator {
    public static boolean validate(Point point){
        double x = point.getX();
        double y = point.getY();

        if (x > 0 && y > 0){
            return validate1(point);
        } else if (x <= 0 && y >= 0) {
            return validate2(point);
        } else if (x <= 0 && y <= 0) {
            return validate3(point);
        } else if (x >= 0 && y <= 0) {
            return validate4(point);
        }

        return false;

    }

    private static boolean validate1(Point point){
        double x = point.getX();
        double y = point.getY();
        double r = point.getR();

        return y <= -x/2 + r/2;
    }

    private static boolean validate2(Point point){
        double x = point.getX();
        double y = point.getY();
        double r = point.getR();

        return -x <= r/2 && y <= r;
    }

    private static boolean validate3(Point point){
        return false;
    }

    private static boolean validate4(Point point){
        double x = point.getX();
        double y = point.getY();
        double r = point.getR();

        return x * x + y * y <= r/2 * r/2;
    }

}
