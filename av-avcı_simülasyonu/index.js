class Hayvan {
    constructor(tur, cinsiyet, hareketMesafesi) {
        this.tur = tur;
        this.cinsiyet = cinsiyet;
        this.hareketMesafesi = hareketMesafesi;
        this.x = Math.floor(Math.random() * 500);
        this.y = Math.floor(Math.random() * 500);
        this.hayatta = true;
    }

    hareketEt() {
        const dx = (Math.random() * 2 - 1) * this.hareketMesafesi;
        const dy = (Math.random() * 2 - 1) * this.hareketMesafesi;

       
        this.x = Math.max(0, Math.min(499, this.x + dx));
        this.y = Math.max(0, Math.min(499, this.y + dy));
    }

    mesafeDegeri(hayvan) {
        return Math.sqrt((this.x - hayvan.x) ** 2 + (this.y - hayvan.y) ** 2);
    }
}


class Koyun extends Hayvan { constructor(cinsiyet) { super("koyun", cinsiyet, 2); } }
class Kurt extends Hayvan { constructor(cinsiyet) { super("kurt", cinsiyet, 3); } }
class İnek extends Hayvan { constructor(cinsiyet) { super("inek", cinsiyet, 2); } }
class Tavuk extends Hayvan { constructor() { super("tavuk", "disi", 1); } }
class Horoz extends Hayvan { constructor() { super("horoz", "erkek", 1); } }
class Aslan extends Hayvan { constructor(cinsiyet) { super("aslan", cinsiyet, 4); } }
class Avci extends Hayvan { constructor() { super("avci", "insan", 1); } }

let hayvanlar = [];

// İlk popülasyon
for(let i = 0; i < 15; i++) {
    hayvanlar.push(new Koyun("disi"));
    hayvanlar.push(new Koyun("erkek"));
}
for(let i = 0; i < 5; i++) {
    hayvanlar.push(new İnek("disi"));
    hayvanlar.push(new İnek("erkek"));
}
for(let i = 0; i < 10; i++) {
    hayvanlar.push(new Tavuk());
    hayvanlar.push(new Horoz());
}
for(let i = 0; i < 5; i++) {
    hayvanlar.push(new Kurt("disi"));
    hayvanlar.push(new Kurt("erkek"));
}
for(let i = 0; i < 4; i++) {
    hayvanlar.push(new Aslan("disi"));
    hayvanlar.push(new Aslan("erkek"));
}
hayvanlar.push(new Avci());


for(let adim = 0; adim <= 1000; adim++) {
    
    // 1. Hareket
    hayvanlar.forEach(h => { if(h.hayatta) h.hareketEt(); });

    // 2. Avlanma
    hayvanlar.forEach(avci => {
        if(!avci.hayatta) return;
        
        hayvanlar.forEach(av => {
            if(!av.hayatta || av === avci) return;
            
            let mesafe = avci.mesafeDegeri(av);
            
            if(avci.tur === "kurt" && ["koyun","tavuk","horoz"].includes(av.tur) && mesafe <= 4) {
                av.hayatta = false;
            }
            else if(avci.tur === "aslan" && ["inek","koyun"].includes(av.tur) && mesafe <= 5) {
                av.hayatta = false;
            }
            else if(avci.tur === "avci" && av.tur !== "avci" && mesafe <= 8) {
                av.hayatta = false;
            }
        });
    });

    // 3. Üreme
    let yeniDoganlar = [];
    for(let i = 0; i < hayvanlar.length; i++) {
        let h1 = hayvanlar[i];
        if(!h1.hayatta) continue;
        
        for(let j = i + 1; j < hayvanlar.length; j++) {
            let h2 = hayvanlar[j];
            if(!h2.hayatta || h1.tur !== h2.tur || h1.cinsiyet === h2.cinsiyet) continue;

            if(h1.mesafeDegeri(h2) <= 3) {
                
                if(Math.random() < 0.02) { // Üreme şansını %2 yaptık ki tarayıcı donmasın
                    let yeniCinsiyet = Math.random() < 0.5 ? "erkek" : "disi";
                    yeniDoganlar.push(new h1.constructor(yeniCinsiyet));
                }
            }
        }
    }
    hayvanlar.push(...yeniDoganlar); // Bebekleri ana listeye ekle
}

// SONUÇ RAPORU
let sayilar = {};
hayvanlar.forEach(h => {
    if (h.hayatta) {
        sayilar[h.tur] = (sayilar[h.tur] || 0) + 1;
    }
});

let sonuc = "Simülasyon Bitti. Hayatta Kalanlar:\n";
for (let tur in sayilar) {
    sonuc += `${tur}: ${sayilar[tur]}\n`;
}

console.log(sonuc);
alert(sonuc);