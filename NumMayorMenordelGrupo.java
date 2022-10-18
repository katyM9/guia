//Ejercicio 2.24 entero mayor y menor de un grupo de numeros (cap2)


import java.util.Scanner;

public class NumMayorMenordelGrupo {

    public static void main(String[] args) throws Exception {


    int n1=0, n2=0, n3=0, n4=0, n5=0;//, mayor=0, menor=0;

    try (Scanner datos = new Scanner(System.in)) {
        System.out.print("INGRESE UN NUMERO: "); 
        n1 = datos.nextInt();
        System.out.print("INGRESE UN NUMERO: "); 
        n2 = datos.nextInt();
        System.out.print("INGRESE UN NUMERO: "); 
        n3 = datos.nextInt();
        System.out.print("INGRESE UN NUMERO: ");
        n4 = datos.nextInt();
        System.out.print("INGRESE UN NUMERO: ");
        n5 = datos.nextInt();
        System.out.println();
    

    if(n1>n2 && n1>n3 && n1>n4 && n1>n5){
            System.out.println("EL NUMERO "+n1+" ES EL MAYOR ");}

        else if(n2>n1 && n2>n3 && n2>n4 && n2>n5){
            System.out.println("EL NUMERO "+n2+" ES EL MAYOR ");}
        
        else if(n3>n1 && n3>n2 && n3>n4 && n3>n5){
            System.out.println("EL NUMERO "+n3+" ES EL MAYOR ");}
        
        else if(n4>n1 && n4>n2 && n4>n3 && n4>n5){
            System.out.println("EL NUMERO "+n4+" ES EL MAYOR ");}

        else if(n5>n1 && n5>n2 && n5>n3 && n5>n4){
            System.out.println("EL NUMERO "+n5+" ES EL MAYOR ");}


        
        if(n1<n2 && n1<n3 && n1<n4 && n1<n5){
            System.out.println("EL NUMERO "+n1+" ES EL MENOR");}

        if(n2<n1 && n2<n3 && n2<n4 && n2<n5){
            System.out.println("EL NUMERO "+n2+" ES EL MENOR");}

        if(n3<n1 && n3<n2 && n3<n4 && n3<n5){
            System.out.println("EL NUMERO "+n3+" ES EL MENOR");}

        if(n4<n1 && n4<n2 && n4<n3 && n4<n5){
            System.out.println("EL NUMERO "+n4+" ES EL MENOR");}

        if(n5<n1 && n5<n2 && n5<n3 && n5<n4){
            System.out.println("EL NUMERO "+n5+" ES EL MENOR");}


        }
        }
    
    
}

