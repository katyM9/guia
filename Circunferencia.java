//Ejercicio 2.28 Diámetro, circunferencia y área (cap2)

import java.util.Scanner;
import java.lang.Math;

public class Circunferencia {

    public static void main(String[] args) throws Exception {

        double radio, diametro, area, circunferencia;

        Scanner datos= new Scanner(System.in); System.out.println();

        System.out.print("INGRESE EL RADIO: ");
        radio= datos.nextDouble();

        circunferencia=2*Math.PI*radio;
        System.out.println();
        System.out.println("LA CIRCUNFERENCIA ES: "+circunferencia); System.out.println();

        diametro =2*radio;
        System.out.println("EL DIAMETRO ES DE: "+diametro);System.out.println();

        area= Math.PI*radio*radio;
        System.out.print("EL AREA ES DE:"+area); System.out.println();
        

    }
}
