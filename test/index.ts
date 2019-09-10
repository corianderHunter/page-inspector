interface test {
  a: string;
  b: object;
}

type test1<T> = (t: T) => T;

const a: test = {
  a: '1',
  b: {}
};
const testA: test1<test> = a => {
  console.log(a);
  return a;
};

const promiseFunc = () => {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, 2000);
  });
};

const aysFunc = async () => {
  await promiseFunc();
  console.log('ok');
};

aysFunc();
