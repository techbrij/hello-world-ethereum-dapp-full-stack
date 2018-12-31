var helloworld = artifacts.require('HelloWorld');
contract('HelloWorld', function(accounts) {
  let instance;
  before(async () => {
    instance = await helloworld.deployed();
  });
  it('Default message should be hello world',async () => {
    let message = await instance.getMessage.call({from: accounts[0]});           
    assert.equal(message, "Hello World","Incorrect message.");
  });

  it('Should save name',async () => {
    let result = await instance.setName.sendTransaction('Ram',{from: accounts[0]}); 
    let message = await instance.getMessage.call({from: accounts[0]});           
    assert.equal(message, "Hello Ram","Incorrect message.");        
  });

  it('Should be default message for other accounts',async () => {
    let message1 = await instance.getMessage.call({from: accounts[0]});   
    let message2 = await instance.getMessage.call({from: accounts[1]});
    assert.equal(message1, "Hello Ram","Incorrect user message.");  
    assert.equal(message2, "Hello World","Incorrect message.");  
  });

  it('Should throw error on empty name',async () => {
    try{
      let result = await instance.setName.sendTransaction('',{from: accounts[0]}); 
      assert.fail(true,false,"The function should throw error");  
    }
    catch(err){
        assert.include(String(err),'revert','throws different error');
    }
  });

});
