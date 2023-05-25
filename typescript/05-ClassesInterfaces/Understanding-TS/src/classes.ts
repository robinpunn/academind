// abstract class Chain {
//     // private consensus: string;
//     // private name: string;
//     protected dapps: string[] = [];

//     constructor(private readonly consensus: string, public name: string) {
//         // this.name = n;
//         // this.consensus = c;
//     }

//     static createSideChain(name: string) {
//         return name;
//     }

//     abstract describe(this: Blockchain): void;

//     addDapp(dapp: string) {
//         this.dapps.push(dapp);
//     }

//     printDappInfo() {
//         console.log(this.dapps.length);
//         console.log(this.dapps);
//     }
// }

// class Layer2 extends Blockchain {
//     constructor (consensus: string, public memeCoins: string[]) {
//         super(consensus, 'ScamChain')
//     }

//     describe() {
//         console.log('Layer 2 Blockchain built on top of RobChain, not a scame')
//     }
// }

// class Layer3 extends Blockchain {
//     private lastGas: number;

//     describe() {
//         console.log('Layer 3 blockchain built on top of ScamChain which is built on top of RobChain')
//     }

//     get getMostRecentGas() {
//         if (this.lastGas) {
//            return `The last gas was ${this.lastGas} gas molecules`
//         }
//         else {throw new Error('whaddamigonnado?')}
//     }

//     set setMostRecentGas(amount: number) {
//         this.removeGasFees(amount)
//     }

//     constructor (consensus: string, private gasReducer: number[]) {
//         super(consensus, "SpeedChain")
//         this.lastGas = gasReducer[0]
//     }

//     addDapp(dapp: string){
//         if (dapp === "Algo") {
//             return
//         }
//         this.dapps.push(dapp)
//     }

//     removeGasFees(amount: number) {
//         this.gasReducer.push(amount)
//         this.lastGas = amount
//     }

//     printGas() {
//         console.log(`We last removed: ${this.gasReducer} gas molecules`)
//     }
// }

// // const robCoin = new Blockchain('PoW','RobChain');
// const borCoin = new Layer2('PoS', ['BorderCollieCoin'])
// const nibCoin = new Layer3('PoS', [])

// // robCoin.addDapp('UniSwap');
// // robCoin.addDapp('Aave');

// borCoin.addDapp('1Inch');
// borCoin.addDapp('Compound');

// nibCoin.addDapp('UniSwap');
// nibCoin.addDapp('Aave');
// nibCoin.addDapp('1Inch');
// nibCoin.addDapp('Compound');
// nibCoin.addDapp('Algo')

// // robCoin.dapps[2] = 'Curve'

// // robCoin.describe();
// // robCoin.printDappInfo();

// borCoin.describe();
// borCoin.printDappInfo();

// nibCoin.removeGasFees(7)
// nibCoin.printGas()
// nibCoin.describe();
// nibCoin.printDappInfo();

// // console.log(nibCoin.mostRecentGas)
// nibCoin.setMostRecentGas = 13
// console.log(nibCoin.getMostRecentGas)
// console.log(borCoin)
// console.log(nibCoin)

// // const robCoinCopy = {name: 'RobCoinFork', describe: robCoin.describe};

// // robCoinCopy.describe();