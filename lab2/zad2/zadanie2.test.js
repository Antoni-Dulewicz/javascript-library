export function test_sum(){
    describe('The sum() function', function(){
        it('should return 4 for 2+2',function(){
            sum(2,2).should.equal(4);
        });
        it('should return 0 for -2+2',function(){
            sum(-2,2).should.equal(0);
        });
    });
}

function sum_strings(arr) {
    var sum = 0;
    for(let i = 0; i < arr.length; i++){
        let num = parseInt(arr[i])
        if(!isNaN(num)){
            sum += num;
        }
    }

    return sum;
}

function sum_strings_f(str){
    const arr = Array.from(str)
    return arr.reduce((sum,str) =>{
        let num = parseInt(str)
        return isNaN(num) ? sum : sum + num
    },0);
}

function digits(str) {
    var odd = 0;
    var even = 0
    for(let i = 0; i < str.length; i++){
        let num = parseInt(str[i]);
        if(!isNaN(num)){
            if(num%2 == 0){
                even += num
            }else{
                odd += num
            }
        }
    }
    return [odd,even]

}

function digits_f(str){
    const digArr = Array.from(str)

    const [odd,even] = digArr.reduce(([oddSum,evenSum],char) =>{
        let num = parseInt(char)
        if(!isNaN(num)){
            return num %2 == 0 ? [oddSum, evenSum + num] : [oddSum + num, evenSum]
        }
        return [oddSum,evenSum]
    },[0,0]);

    return [odd,even]

}




function letters(str){
    var cnt_small = 0
    var cnt_big = 0

    for(let i = 0; i < str.length; i++){
        if(str[i].match(/[a-z]/)){
            cnt_small++
        }
        if(str[i].match(/[A-Z]/)){
            cnt_big++
        }
    }

    return [cnt_small,cnt_big]
}


function letters_f(str){
    const letArr = Array.from(str)

    const [smallCnt, bigCnt] = letArr.reduce(([small,big],char) => {
        if(char.match(/[a-z]/)){
            return [small + 1,big]
        }else if(char.match(/[A-Z]/)){
            return [small,big+1]
        } 
        return [small,big]
        

    },[0,0]);

    return [smallCnt,bigCnt]
}



export function test_string_operations() {
    describe("String operations", function () {
        context("When the array contains strings", function () {
            it("the sum_strings() function should return the sum of those strings that are numbers or begin with a sequence of digits", function () {
                sum_strings(["123", "146a2B", "", "b3345a", "\t"]).should.equal(269);
            });
        });

        context("When the array is empty", function () {
            it("the sum_strings() function should return 0", function () {
                sum_strings([]).should.equal(0);
            });
        });

        context("When the string contains only digits", function () {
            it("the 'digits()' function should return an array with the sum of odd and even digits", function () {
                digits("123").should.deep.equal([4, 2]);
            });
            it("the 'letters()' function should return [0, 0]", function () {
                letters("123").should.deep.equal([0, 0]);
            });
        });

        context("When the string contains only letters", function () {
            it("the 'digits()' function should return [0, 0]", function () {
                digits("aBc").should.deep.equal([0, 0]);
            });
            it("the 'letters()' function should return an array with the number of lowercase and uppercase letters", function () {
                letters("aBc").should.deep.equal([2, 1]);
            });
        });

        context("When the string contains letters followed by digits", function () {
            it("the 'digits()' function should return an array with the sum of the odd and even digits", function () {
                digits("aB123").should.deep.equal([4, 2]);
            });
            it("the 'letters()' function should return an array with the number of lowercase and uppercase letters", function () {
                letters("aB123").should.deep.equal([1, 1]);
            });
        });

        context("When the string contains digits followed by letters", function () {
            it("the 'digits()' function should return an array with the sum of the odd and even digits", function () {
                digits("123aB").should.deep.equal([4, 2]);
            });
            it("the 'letters()' function should return an array with the number of lowercase and uppercase letters", function () {
                letters("123aB").should.deep.equal([1, 1]);
            });
        });

        describe("When the string is empty", function () {
            it("the 'digits()' function should return [0, 0]", function () {
                digits("").should.deep.equal([0, 0]);
            });
            it("the 'letters()' function should return [0, 0]", function () {
                letters("").should.deep.equal([0, 0]);
            });
        });
    });
}
