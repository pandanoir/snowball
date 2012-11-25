memo=new Array();
function fib(n){
	if(n<=1) return n;
	if(memo[n]!=null) return memo[n];
	return memo[n]=fib(n-1)+fib(n-2);
}
