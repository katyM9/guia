//ejercicio 2.16 Comparación de enteros (cap2)

import java.util.Scanner;

public class App1 {
   
    public static void main(String[] args){

        int n1, n2;

        try (Scanner recibir = new Scanner(System.in)) {
            System.out.print("INGRESE UN NUMERO: ");
            n1= recibir.nextInt();

            System.out.print("INGRESE OTRO NUMERO: ");
            n2= recibir.nextInt();
        }

        if(n1==n2){
            System.out.println("ESTOS NUMEROS SON IGUALES");
        }
        else if(n1>n2){
            System.out.println(+(n1)+" ES MAS GRANDE QUE "+(n2));
        }else{
            if(n1<n2){
                System.out.println(+n2+" ES MAS GRANDE QUE "+n1);
            }
        }
    }
}
