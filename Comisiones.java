//Ejercicio 4.19 calculadora de comisiones de ventas (cap4)

import java.util.Scanner;

public class Comisiones{
    
    public static void main(String[] args) {
        double A, B, C, D, st, total;

        try (Scanner ent = new Scanner(System.in)) {
            
            System.out.print("VENTAS REALIZADAS DEL PRODUCTO A: ");
            A = ent.nextLong();
            
            System.out.print("VENTAS REALIZADAS DEL PRODUCTO B: ");
            B = ent.nextLong();

            System.out.print("VENTAS REALIZADAS DEL PRODUCTO C: ");
            C = ent.nextLong();

            System.out.print("VENTAS REALIZADAS DEL PRODUCTO D: ");
            D = ent.nextLong();}


        st=(A*239.99) + (B*129.75) + (C*99.95) + (D*350.89);

        total = 200 + st *0.09;

        
        System.out.print("\n\n EL PAGO TOTALES DE: "+total);    
    }   
}

