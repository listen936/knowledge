// 什么是单例模式？
// 1、创建型模式 2、全局只会创建一个实例对象

// 怎么实现？
//1、函数方式
function SingleTon(name) {
  this.name = name;
  this.instance = null;
}
SingleTon.getInstance = function (name) {
  if (!this.instance) {
    this.instance = new SingleTon(name);
  }
  return this.instance;
};
const in_a = SingleTon.getInstance("a");
const in_b = SingleTon.getInstance("b");
console.log(in_a === in_b); //true

//2、闭包方式
function SingleTon(name) {
  this.name = name;
}
SingleTon.getInstance = (function () {
  let instance = null;
  return function (name) {
    if (!instance) {
      instance = new SingleTon(name);
    }
    return instance;
  };
})();
const in_a = SingleTon.getInstance("a");
const in_b = SingleTon.getInstance("b");
console.log(in_a === in_b); //true

//3、构造函数方式

const CreateSingleTon = function (fn) {
  var instance = null;
  return function () {
    return instance || (instance = fn.apply(this, arguments));
  };
};
function singleTon(name) {
  this.name = name;
  return name;
}

const createSingleTonObj = CreateSingleTon(singleTon);
const in_a = createSingleTonObj("a");
const in_b = createSingleTonObj("b");
console.log(in_a === in_b); //true

// 4. 类

class SingleTon {
  static instance;
  name = "";
  static getInstance(name) {
    if (!SingleTon.instance) {
      SingleTon.instance = new SingleTon(name);
    }
    return SingleTon.instance;
  }
  constructor(name) {
    // const i = this.constructor;
    const i = SingleTon;
    if (!i.instance) {
      this.name = name;
      i.instance = this;
    }
    return i.instance;
  }
}
const in_a = SingleTon.getInstance("a");
const in_b = SingleTon.getInstance("b");
const in_c = new SingleTon("c");
const in_d = new SingleTon("d");
console.log(in_a, in_b, in_c, in_d); //true
