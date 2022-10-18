//Ejercicio 2.25 Par o Impar (cap2)


import java.util.Scanner;

public class ParImpar {
    public static void main(String[] args) throws Exception {


        int num; 

        Scanner datos = new Scanner(System.in);
        System.out.print("INGRESE UN NUMERO PARA DETERMINAR SI ES PAR O IMPAR: ");
        num = datos.nextInt();

        if(num%2 ==0){

            System.out.println("EL NUMERO "+num+" ES PAR");
        }else{
            System.out.println("EL NUMERO "+num+" ES IMPAR");
        }
    }
}
