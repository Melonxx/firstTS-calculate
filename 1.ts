// {
//   function createButton(text: string, wrap: HTMLElement, className: string): HTMLButtonElement {
//     let button: HTMLButtonElement = document.createElement('button');
//     button.textContent = text;
//     button.classList.add('button');
//     button.classList.add(className?className:'');
//     wrap.appendChild(button);
//     return button;
//   }
//   let top:HTMLDivElement = document.createElement('div');
//   top.classList.add('top-screen');
//   top.textContent = '0';
//   let bottom:HTMLDivElement = document.createElement('div');
//   bottom.classList.add('bottom-bar');
//   let wrap:HTMLDivElement = document.createElement('div');
//   document.body.appendChild(wrap);
//   wrap.classList.add('calc-wrap');
//   wrap.appendChild(top);
//   wrap.appendChild(bottom);
//   let n1: string = '';
//   let n2: string = '';
//   let option: string = '';
//   let resultEnd: string = '';
//   wrap.addEventListener('click', (event): void => {
//     if(event.target instanceof HTMLButtonElement){
//       let button: HTMLButtonElement = event.target;
//       let text: string = button.textContent;
//       if('0123456789.'.indexOf(text) >= 0){
//         if(option){
//           n2 += text;
//           top.textContent = n2;
//         } else {
//           n1 += text;
//           top.textContent = n1;
//         }
//       } else if('+-×÷'.indexOf(text) >= 0){
//         if(n1 === ''){
//           n1 = resultEnd;
//         }
//         option = text;
//       } else if('='.indexOf(text) >= 0){
//         let result: number;
//         if(option === '+') result = Number(n1) + Number(n2)
//         if(option === '-') result = Number(n1) - Number(n2)
//         if(option === '×') result = Number(n1) * Number(n2)
//         if(option === '÷') result = Number(n1) / Number(n2)
//         top.textContent = resultEnd = result.toString();
//         n1 = '';
//         n2 = '';
//         option = '';
//       }
//       console.log(n1, option, n2, resultEnd);
//     }
//   });
//   let keys: Array<Array<string>> = [
//     ['Clear', '÷'],
//     ['7', '8', '9', '×'],
//     ['4', '5', '6', '-'],
//     ['1', '2', '3', '+'],
//     ['0', '.', '=']
//   ]
//   keys.map((v1: Array<string>): void => {
//     let div:HTMLDivElement = document.createElement('div');
//     div.classList.add('button-bar');
//     v1.map((v2: string): void => {
//       createButton(v2, div, `button-${v2}`);
//     })
//     bottom.appendChild(div);
//   })
// }


{
  class Calculate {
    private n1: string = '';
    private n2: string = '';
    private option: string = '';
    private result: string = '';
    private keys: Array<Array<string>> = [
      ['Clear', '÷'],
      ['7', '8', '9', '×'],
      ['4', '5', '6', '-'],
      ['1', '2', '3', '+'],
      ['0', '.', '=']
    ];
    public bottomBar: HTMLDivElement;
    public top: HTMLDivElement;
    public wrap: HTMLDivElement;
    constructor(){
      this.createTopScreen();
      this.createBottomBar();
      this.createWrap();
      this.createAllButton();
      this.bindEvents();
    }
    createSingleButton(text: string, wrap: HTMLElement, className: string): HTMLButtonElement {
      let button: HTMLButtonElement = document.createElement('button');
      button.textContent = text;
      button.classList.add('button');
      button.classList.add(className?className:'');
      wrap.appendChild(button);
      return button;
    }
    createTopScreen(): void {
      let top:HTMLDivElement = document.createElement('div');
      top.classList.add('top-screen');
      top.textContent = '0';
      this.top = top;
    }
    createBottomBar(): void {
      let bottom:HTMLDivElement = document.createElement('div');
      bottom.classList.add('bottom-bar');
      this.bottomBar = bottom;
    }
    createWrap(): void {
      let wrap:HTMLDivElement = document.createElement('div');
      document.body.appendChild(wrap);
      wrap.classList.add('calc-wrap');
      wrap.appendChild(this.top);
      wrap.appendChild(this.bottomBar);
      this.wrap = wrap;
    }
    createAllButton(): void {
      this.keys.map((v1:Array<string>): void => {
        let div:HTMLDivElement = document.createElement('div');
        div.classList.add('button-bar');
        v1.map((v2: string): void => {
          this.createSingleButton(v2, div, `button-${v2}`);
        })
        this.bottomBar.appendChild(div);
      })
    }
    checkNumber(num: string, text: string): void{
      if(text === '.' && this[num].indexOf('.') >= 0){
        this.top.textContent = this[num];
        return;
      }
      this[num] += text;
      this.top.textContent = this[num];
    }
    updateNumber(text: string): void {
      if(this.option){
        this.checkNumber('n2', text);
      } else {
        this.checkNumber('n1', text);
      }
    }
    updateOption(text: string):void {
      if(this.n1 === ''){
        this.n1 = this.result;
      }
      this.option = text;
    }
    updateResult(): void {
      if(this.n1 === '' && this.n2 === '' && this.option === ''){
        this.top.textContent = this.result;
        return;
      }
      let result: number;
      if(this.option === '+') result = Number(this.n1) + Number(this.n2);
      if(this.option === '-') result = Number(this.n1) - Number(this.n2);
      if(this.option === '×') result = Number(this.n1) * Number(this.n2);
      if(this.option === '÷') result = Number(this.n1) / Number(this.n2);
      this.top.textContent = this.result = result.toString();
      if(result.toString().length > 9){
        this.top.textContent = this.result = result.toPrecision(9).toString().replace(/0+$/,'').replace(/\.$/,'');
      }
      if(this.n2 === '0') this.top.textContent = '不是数字';
      this.n1 = '';
      this.n2 = '';
      this.option = '';
      
    }
    updateNumberAndOption(text: string): void{
      if('0123456789.'.indexOf(text) >= 0){
        this.updateNumber(text);
      } else if('+-×÷'.indexOf(text) >= 0){
        this.updateOption(text)
      } else if('='.indexOf(text) >= 0){
        this.updateResult();
      } else if('Clear' === text){
        this.n1 = '';
        this.n2 = '';
        this.option = '';
        this.top.textContent = this.result = '0';
      }
      console.log(this.n1, this.option, this.n2, this.result);
    }
    bindEvents(): void {
      this.wrap.addEventListener('click', (event): void => {
        if(event.target instanceof HTMLButtonElement){
          let button: HTMLButtonElement = event.target;
          let text: string = button.textContent;
          this.updateNumberAndOption(text);
        }
      })
    }
  }
  
  new Calculate()
}
