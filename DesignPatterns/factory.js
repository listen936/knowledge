// 工厂模式

// 是什么？
// 工厂模式是一种创建对象实例的设计模式，将创建对象的逻辑封装在函数内部，不对外暴露，这个函数就可以称为工厂

// 怎么写

// 1、简单工厂
function Factory(career) {
  function User(career, work) {
    this.career = career;
    this.work = work;
  }
  switch (career) {
    case "boss":
      return new User(career, ["数钱"]);
    case "财务":
      return new User(career, ["发钱"]);
  }
}
const userA = new Factory("boss");
const userB = new Factory("财务");
console.log(userA, userB);

// 2、工厂方法
function Factory(career) {
  if (this instanceof Factory) {
    return new this[career]();
  } else {
    return new Factory(career);
  }
}
Factory.prototype = {
  boss: function () {
    this.career = "boss";
    this.work = ["数钱"];
  },
  财务: function () {
    this.career = "财务";
    this.work = ["发钱"];
  },
};
console.log(new Factory("boss"));
console.log(Factory("财务")); //

// 3、抽象工厂模式

class AbstractFactory {
  constructor() {
    if (new.target === AbstractFactory) {
      throw new Error("抽象类不能实例化");
    }
  }
  createProduct() {
    throw new Error("抽象方法不能调用");
  }
}
class Factory extends AbstractFactory {
  constructor() {
    super();
  }
  createProduct(type) {
    switch (type) {
      case "product1":
        return new Product1();
      //   case "product2":
      //     return new Product2();
      default:
        throw new Error("没有该产品");
    }
  }
}
class AbstractProduct {
  constructor() {
    if (new.target === AbstractFactory) {
      throw new Error("抽象类不能实例化");
    }
  }
  getPrice() {
    throw new Error("抽象方法不能调用");
  }
}

class Product1 extends AbstractProduct {
  constructor() {
    super();
  }
  getPrice() {
    console.log("1111");
  }
}
const factory = new Factory();
const p1 = factory.createProduct("product1");
p1.getPrice();
