//Ejercicio 4.29 cuadrado de asteriscos (cap4)

import java.util.Scanner;
 
public class CuadradodeAsteriscos {
 
    public static void main(String[] args) {
       
        Scanner datos = new Scanner(System.in);
       
        System.out.print("INGRESE EL TAMAÑO DEL CUADRADO QUE DESEE: ");
        int n = datos.nextInt();
       
        if(n >= 0 && n<=20) {
 
            for(int i = 0; i < n; i++) {
                System.out.print("*");}

            System.out.println();
           
            for(int i = 0; i < n-2; i++) {
                System.out.print("*");
                for(int a = 0; a < n-2; a++) {
                    System.out.print(" ");
                }
                System.out.println("*");
            }
           

            for(int i = 0; i < n; i++) {
                System.out.print("*");
            }
        }else {
            System.out.println("DEBE INGRESAR UN NUMERO QUE ESTE ENTRE 0 Y 20");
        }
               
 
    }
}
