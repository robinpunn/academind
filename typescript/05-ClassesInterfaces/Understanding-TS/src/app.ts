// interface Blockchain {
//     name: string;
//     confirmation: string;
//     nonce: number;
//     block: number;
//     nfts: string[]

//     mine(): void;
//     getDistributedAmount(): void;
//     createNFT(create: string): string;
//     seeNFTs(): void
// }

// let firstChain: Blockchain;

// firstChain = {
//     name: 'RobChain',
//     confirmation: 'PoW',
//     nonce: 0,
//     block:0,
//     nfts: [],
//     mine() {
//         this.nonce ++
//         this.block += 10
//     },
//     getDistributedAmount() {
//         console.log(this.nonce * this.block)
//     },
//     createNFT(create:string) {
//         this.nfts.push(create)
//         return `you created a ${create}!`
//     },
//     seeNFTs() {
//         console.log(this.nfts)
//     }
// }

// firstChain.mine()
// firstChain.mine()
// firstChain.mine()
// firstChain.mine()
// firstChain.mine()

// firstChain.getDistributedAmount()

// firstChain.createNFT('ooonga')
// firstChain.createNFT('boonga')
// firstChain.createNFT('loonga')
// firstChain.createNFT('munnga')
// firstChain.createNFT('mungo')

// firstChain.seeNFTs()

interface Mineable {
    block: number;
    nonce: number;

    mine(): void;
    getDistributedAmount(): void;
}

interface NFT {
    nfts: string[];

    createNFT(create: string): string;
    seeNFTs(): void
}

class Blockchain implements Mineable, NFT {
    name: string;
    block: number = 0;
    nonce: number = 0;
    nfts: string[] = [];

    constructor(_name: string) {
        this.name = _name
    }

    mine () {
        this.block += 5
        this.nonce ++
    }

    getDistributedAmount(): void {
        console.log(this.block*this.nonce)
    }

    createNFT(create: string): string {
        this.nfts.push(create)
        return `you created a ${create}`
    }

    seeNFTs(): void {
        console.log(this.nfts)
    }
}

let robChain = new Blockchain('RobChain')

console.log(robChain)

// extending interfaces
interface Named {
    readonly name: string
}

interface Greetable extends Named {
    greet(phrase: string): void
}

class Person implements Greetable {
    name: string;
    age: number;

    constructor(_name: string, _age: number) {
        this.name = _name;
        this.age = _age
    }

    greet(phrase: string) {
        console.log(`My name is ${this.name}, ${phrase}`)
    }
}

// Interfaces as Function Types
interface AddFn {
    (a:number, b: number): number;
}

let add: AddFn;

add = (n1: number, n2: number) => n1 + n2