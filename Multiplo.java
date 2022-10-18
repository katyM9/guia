//Ejercicio 2.26 Determinar si un n1 es múltiplo de n2 (cap2)


import java.util.Scanner;

public class Multiplo {
    public static void main(String[] args) throws Exception {

        try (Scanner datos = new Scanner(System.in)) {
            int n1=0, n2=0, res=0;

    System.out.print("INGRESE UN NUMERO: "); n1 = datos.nextInt();

    System.out.print("INGRESE UN NUMERO: "); n2 = datos.nextInt();

            res= n1%n2;

        if(res==0){
            System.out.println(+n1+" ES MULTIPLO DE "+n2);
        }else{
            System.out.println(+n1+ " NO ES MULTIPLO DE "+n2);
        }
        } 
    }
}
