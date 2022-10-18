//Ejercicio 5.11 Encontrar el menor de los valores ingresados


import java.util.Scanner;
 
public class Menor {
    public static void main(String[] args) {
       
        Scanner datos = new Scanner(System.in);
       
        System.out.print("TAMAÑO DEL ARRAY: ");
        int n = datos.nextInt();
        int array [] = new int [n];
       
        for (int i = 0; i < array.length; i++) {
            System.out.print("VALOR "+(i+1)+": ");
            array [i] = datos.nextInt();
        }
        int menor;
        menor = array [0];
       
        for (int i = 0; i < array.length; i++) {
            if(array[i]<menor) {
                menor = array[i];
            }
        }
        System.out.println("EL MENOR DE LOS VALORES INGRESADOS ES: "+menor);
    }
}










/* 
import java.util.Scanner;

public class Menor {
 
    public static void main(String[] args) {

    int tam=0;
    int array [] = new int [tam];

         try (Scanner datos = new Scanner(System.in);) {
            {
                System.out.print("TAMAÑO DEL ARRAY: "); tam = datos.nextInt();
                
                for (int i = 0; i < array.length; i++) {
                    System.out.print("VALOR "+(i+1)+": ");
                    array [i] = datos.nextInt();
                }

                int menor;
                menor = array [0];
     
                for (int i = 0; i < array.length; i++) {
                    if(array[i]<menor) {
                        menor = array[i];
                    }
                }
                System.out.println("EL MENOR DE LOS VALORES INGRESADOS ES: "+menor);
            
   }
        }
}
}
*/