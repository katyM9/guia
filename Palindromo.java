import java.util.Scanner;

//Ejercicio 4.30 Palíndromos


public class Palindromo {
    public static void main(String[] args) throws Exception {
        System.out.println("INGRESE LAS 5 CIFRAS QUE FORMAN EL NÚMERO ");

        int n1, n2, n3, n4, n5;
        Scanner datos =new Scanner(System.in);
        System.out.print("CIFRA 1:");    n1=datos.nextInt();
        System.out.print("CIFRA 2:");    n2=datos.nextInt();
        System.out.print("CIFRA 3:");    n3=datos.nextInt();
        System.out.print("CIFRA 4:");     n4=datos.nextInt();
        System.out.print("CIFRA 5:");     n5=datos.nextInt();

        if(n1==n5 && n2==n4){

            System.out.println("EL NUMERO "+n1+n2+n3+n4+n5+(" ES PALINDROMO"));
        }else{

            System.out.println("EL NUMERO "+n1+n2+n3+n4+n5+(" NO ES PALINDROMO"));  
        }
    }
}
