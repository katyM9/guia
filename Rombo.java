//Ejercicio 5.24 Imprimir Rombos


import java.util.Scanner;

public class Rombo{
    public static void main(String[] args)
    {
        try (Scanner datos = new Scanner(System.in)) {

            int tam, a, b;

        System.out.print("INGRESE EL TAMAÑO DEL ROMBO: ");
        tam = datos.nextInt();

        for(a=0; a<=tam; a++){
            for(b=tam-a; b>0; b--){
                System.out.print(" ");
            }
            for(b=0; b<a; b++){
                System.out.print(" *");
            }
            System.out.println("");
        }

        for(a=0; a<=tam; a++){
            for(b=0; b<=a; b++){
            System.out.print(" ");
            }

            for(b=tam-a-1; b>0; b--){
            System.out.print(" *");
            }
            System.out.println("");
        }   
    }
}
}
