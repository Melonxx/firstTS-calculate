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
    var Calculate = /** @class */ (function () {
        function Calculate() {
            this.n1 = '';
            this.n2 = '';
            this.option = '';
            this.result = '';
            this.keys = [
                ['Clear', '÷'],
                ['7', '8', '9', '×'],
                ['4', '5', '6', '-'],
                ['1', '2', '3', '+'],
                ['0', '.', '=']
            ];
            this.createTopScreen();
            this.createBottomBar();
            this.createWrap();
            this.createAllButton();
            this.bindEvents();
        }
        Calculate.prototype.createSingleButton = function (text, wrap, className) {
            var button = document.createElement('button');
            button.textContent = text;
            button.classList.add('button');
            button.classList.add(className ? className : '');
            wrap.appendChild(button);
            return button;
        };
        Calculate.prototype.createTopScreen = function () {
            var top = document.createElement('div');
            top.classList.add('top-screen');
            top.textContent = '0';
            this.top = top;
        };
        Calculate.prototype.createBottomBar = function () {
            var bottom = document.createElement('div');
            bottom.classList.add('bottom-bar');
            this.bottomBar = bottom;
        };
        Calculate.prototype.createWrap = function () {
            var wrap = document.createElement('div');
            document.body.appendChild(wrap);
            wrap.classList.add('calc-wrap');
            wrap.appendChild(this.top);
            wrap.appendChild(this.bottomBar);
            this.wrap = wrap;
        };
        Calculate.prototype.createAllButton = function () {
            var _this = this;
            this.keys.map(function (v1) {
                var div = document.createElement('div');
                div.classList.add('button-bar');
                v1.map(function (v2) {
                    _this.createSingleButton(v2, div, "button-" + v2);
                });
                _this.bottomBar.appendChild(div);
            });
        };
        Calculate.prototype.checkNumber = function (num, text) {
            if (text === '.' && this[num].indexOf('.') >= 0) {
                this.top.textContent = this[num];
                return;
            }
            this[num] += text;
            this.top.textContent = this[num];
        };
        Calculate.prototype.updateNumber = function (text) {
            if (this.option) {
                this.checkNumber('n2', text);
            }
            else {
                this.checkNumber('n1', text);
            }
        };
        Calculate.prototype.updateOption = function (text) {
            if (this.n1 === '') {
                this.n1 = this.result;
            }
            this.option = text;
        };
        Calculate.prototype.updateResult = function () {
            if (this.n1 === '' && this.n2 === '' && this.option === '') {
                this.top.textContent = this.result;
                return;
            }
            var result;
            if (this.option === '+')
                result = Number(this.n1) + Number(this.n2);
            if (this.option === '-')
                result = Number(this.n1) - Number(this.n2);
            if (this.option === '×')
                result = Number(this.n1) * Number(this.n2);
            if (this.option === '÷')
                result = Number(this.n1) / Number(this.n2);
            this.top.textContent = this.result = result.toString();
            if (result.toString().length > 9) {
                this.top.textContent = this.result = result.toPrecision(9).toString().replace(/0+$/, '').replace(/\.$/,'');
            }
            if (this.n2 === '0')
                this.top.textContent = '不是数字';
            this.n1 = '';
            this.n2 = '';
            this.option = '';
        };
        Calculate.prototype.updateNumberAndOption = function (text) {
            if ('0123456789.'.indexOf(text) >= 0) {
                this.updateNumber(text);
            }
            else if ('+-×÷'.indexOf(text) >= 0) {
                this.updateOption(text);
            }
            else if ('='.indexOf(text) >= 0) {
                this.updateResult();
            }
            else if ('Clear' === text) {
                this.n1 = '';
                this.n2 = '';
                this.option = '';
                this.top.textContent = this.result = '0';
            }
            console.log(this.n1, this.option, this.n2, this.result);
        };
        Calculate.prototype.bindEvents = function () {
            var _this = this;
            this.wrap.addEventListener('click', function (event) {
                if (event.target instanceof HTMLButtonElement) {
                    var button = event.target;
                    var text = button.textContent;
                    _this.updateNumberAndOption(text);
                }
            });
        };
        return Calculate;
    }());
    new Calculate();
}
