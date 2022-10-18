//Ejercicio 5.16 Gráfico de barras

import java.util.Scanner;

public class Barras{

    public static void main( String args[]){ 
    {
        Scanner datos = new Scanner(System.in);

        int num1, num2, num3, num4, num5;
        int a=1;

            System.out.println("INGRESE 5 NUMEROS QUE SE ENCUENTREN DENTRO DEL RANGO 1-30");
            System.out.println();
            System.out.print("PRIMER NUMERO: "); num1 = datos.nextInt();
            System.out.print("SEGUNDO NUMERO: "); num2 = datos.nextInt();
            System.out.print("TERCER NUMERO: "); num3 = datos.nextInt();
            System.out.print("CUARTO NUMERO: "); num4 = datos.nextInt();
            System.out.print("QUINTO NUMERO: "); num5 = datos.nextInt();


            if ((1 <= num1) && ( 30 >= num1)){     
                for ( int i = 1; i <= num1; i++ )
                System.out.print("*");
                System.out.println();
                a++;
            }    
            
            if ((1 <= num2) && ( 30 >= num2)){     
                for ( int i = 1; i <= num2; i++ )
                System.out.print("*");
                System.out.println();
                a++;
            }   

            if ((1 <= num3) && ( 30 >= num3)){     
                for ( int i = 1; i <= num3; i++ )
                System.out.print("*");
                System.out.println();
                a++;
            }   

            if ((1 <= num4) && ( 30 >= num4)){     
                for ( int i = 1; i <= num4; i++ )
                System.out.print("*");
                System.out.println();
                a++;
            }   

            if ((1 <= num5) && ( 30 >= num5)){     
                for ( int i = 1; i <= num5; i++ )
                System.out.print("*");
                System.out.println();
                a++;
            }   
        }
    }
}
