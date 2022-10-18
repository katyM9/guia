//Ejercicio 2.17 Suma, Promedio, producto, mayor y menor (cap2)

import java.util.Scanner;

public class MenorMayorPromedio {
 
    public static void main(String[] args) throws Exception {

        try (Scanner datos = new Scanner(System.in)) {
            int num1, num2, num3;

            System.out.print("INGRESE EL PRIMER NUMERO: ");num1= datos.nextInt();
            System.out.print("INGRESE EL SEGUNDO NUMERO: "); num2= datos.nextInt();
            System.out.print("INGRESE EL TERCER NUMERO: "); num3= datos.nextInt();
            System.out.println();

            System.out.println("LA SUMA DE LOS NUMEROS ES: "+(num1+num2+num3));
            System.out.println();
            System.out.println("EL PROMEDIO DE LOS NUMEROS ES: "+((num1+num2+num3)/3));
            System.out.println();
            System.out.println("EL PRODUCTO DE LOS NUMEROS ES: "+(num1*num2*num3));
            System.out.println();
            


            if(num1==num2){
                if(num1==num3){
                System.out.println("LOS NUMEROS SON INGUALES");}

            }if(num1>num2 && num1>num3){
                System.out.println("EL NUMERO "+num1+" ES EL MAYOR DE LOS NUMEROS IGRESADOS");}
                System.out.println();
            if(num2>num1 && num2>num3){
                System.out.println("EL NUMERO "+num2+" ES EL MAYOR DE LOS NUMEROS INGRESADOS");}
                System.out.println();
            if(num3>num1 && num3>num2){
                System.out.println("EL NUMERO "+num3+" ES EL MAYOR DE LOS NUMEROS INGRESADOS");}
                System.out.println();


                if(num1<num2 && num1<num3){
                    System.out.print("EL NUMERO "+num1+" ES EL MENOR DE LOS NUMEROS INGRESADOS");}

                if(num2<num1 && num2<num3){
                        System.out.print("EL NUMERO "+num2+ " ES EL MENOR DE LOS NUMEROS INGRESADOS");}
            
                if(num3<num1 && num3<num2){
                        System.out.print("EL NUMERO "+num3+" ES EL MENOR DE LOS NUMEROS INGRESADOS");}

        }
    }
}
