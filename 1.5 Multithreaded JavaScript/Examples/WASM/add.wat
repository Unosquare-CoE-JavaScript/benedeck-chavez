(module ;;The first line declares a module. Every WAT file begins with this.

    ;;We declare a function called $add, taking in two 32-bit integers and returning another 32-bit integer.
  (func $add (param $a i32) (param $b i32) (result i32) 
    local.get $a
    local.get $b
    i32.add)
    ;;In order to use a function outside the module in the host environment, it needs to be exported. 
    ;;Here we export the $add function, giving it the external name add.
  (export "add" (func $add)) 
)