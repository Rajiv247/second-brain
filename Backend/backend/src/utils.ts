export function Randaom(len :number){

    let option = "hvchvcidsvhdsvjsdhv";
    let length = option.length;

    let ans = "";

    for(let i = 0; i < len; i++){

        ans += option[Math.floor(Math.random() * length)];
    }

    return ans;
}