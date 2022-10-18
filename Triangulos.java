//Ejercicio 5-25 mostrar triángulos


import java.util.Scanner;

public class Triangulos{
    public static void main(String[] args){


        int tam; 
        int a1, b1, c1, d1, e1, f1, g1, h1, j1;

        System.out.print("INGRESE EL TAMAÑO DE LOS TRIANGULOS: ");
        Scanner datos = new Scanner(System.in);
        tam= datos.nextInt(); System.out.println("\n");
    
        for (a1 = 1; a1 <= tam; a1++ )
        {           
            for (b1=1; b1<=a1; b1++ )
            System.out.print("*");
    
                for (c1=a1 + 1; c1<=tam; c1++)
                System.out.print(" ");
                System.out.print(" ");
                System.out.print(" ");
                System.out.print(" ");
                System.out.print(" ");

                for (d1=1; d1<= tam + 1 - a1; d1++ )
                System.out.print("*");

                for (e1=tam - 1 - a1; e1<= tam; e1++)
                System.out.print(" ");
                System.out.print(" ");
                System.out.print(" ");
                System.out.print(" ");
                System.out.print(" ");

                for (f1=1; f1< a1; f1++ )
                System.out.print(" ");
                
                for (g1=a1; g1<= tam; g1++ )
                System.out.print("*");
                System.out.print(" ");
                System.out.print(" ");
                System.out.print(" ");
                System.out.print(" ");

                for (h1=1; h1<=tam - a1; h1++ )
                System.out.print(" ");

                for (j1= tam - a1; j1< tam; j1++ )
                System.out.print("*");
                System.out.println();
        }           
                System.out.println("\n");
    }       
}

