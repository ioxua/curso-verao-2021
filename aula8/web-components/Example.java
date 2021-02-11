class A {
  String foo;
  void a() {
    System.out.println("A.a()");
  }
}

class B extends A {
  void b() {
    System.out.println("B.b()");
  }
  void a() {
    System.out.println("B.a()");
  }
}

public class Example {
  public static void main(String[] args) {
    A a = new A();
    a.foo = "oi";
    a.a();
    // a.b()
    
    B b = new B();
    b.b();
    b.a();
    // b.bar = "asd";
  }
}
