let data = WeDeploy.data('data-test.wedeploy.io');

async function signUp() {
  return WeDeploy
    .auth('auth-test.wedeploy.io')
    .createUser({
        email: 'pesho@domain.com',
        password: 'abc'
    });
}

async function logIn() {
  return WeDeploy
    .auth('auth-test.wedeploy.io')
    .signInWithEmailAndPassword('pesho@domain.com', 'abc');
}

async function addData() {
  return data.create('books', {
    name: Math.random()
  });
}

async function getData() {
  return data.get('/books');
}

async function test() {
  await logIn();

  const res = await getData();

  console.log(res);

  const watchRefCreate = data
    .watch('books')
    .on('create', (event) => {
      console.log('Created!', event);
    })
    .on('fail', (event) => {
      console.error('CREATE FAILED', event);
    });

  console.log('WATCH CREATE', watchRefCreate);

  const watchRefDelete = data
    .watch('books')
    .on('delete', (event) => {
      console.log('DELETED!', event);
    })
    .on('fail', (error) => {
      console.error('DELETE FAILED', error);
    });

  console.log('WATCH DELETE', watchRefDelete);
}

test();
