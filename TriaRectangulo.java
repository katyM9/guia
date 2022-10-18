//Ejercicio 4.36 determinar si es un triangulo rectangulo


import java.util.Scanner;

public class TriaRectangulo {
    public static void main(String[] args) throws Exception {

        int lado1, lado2, lado3;

        System.out.println("PROGRAMA QUE DETERMINA SI UN TRIÁNGULO ES RECTÁNGULO\n");
        try (Scanner datos = new Scanner(System.in)) {
            System.out.print("LADO 1: ");    lado1=datos.nextInt(); System.out.println();
            System.out.print("LADO 2: ");    lado2=datos.nextInt(); System.out.println();
            System.out.print("LADO 3: ");    lado3=datos.nextInt();
        }
        System.out.println();

        if(((lado1*lado1)+(lado2*lado2))==(lado3*lado3)){
            System.out.println("EL TRIANGULO ES RECTANGULO");
        }

       // if(((lado2*lado2)+(lado3*lado3))==(lado1*lado1))
        if(((lado1*lado1)==((lado2*lado2)+(lado3*lado3)))) {
            System.out.println("EL TRIANGULO ES RECTANGULO");
        }
        
        if(((lado2*lado2)==((lado1*lado1)+(lado3*lado3)))) {
            System.out.println("EL TRIANGULO ES RECTANGULO");
        }
        else{

            System.out.println("EL TRIANGULO NO ES RECTANGULO");
        }
        
        }
    }
   
       

