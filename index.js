const fs = require('fs');// github.com/LWEAXO
const colors = require('colors');
const readline = require('readline').createInterface({
  input: process.stdin,// github.com/LWEAXO
  output: process.stdout
});

function temizleDosyaAdi(adi) {
  return adi.replace(/[<>:"\/\\|?*\x00-\x1F]/g, '_')
           .replace(/\s+/g, '_')
           .replace(/^\.+/, '')// github.com/LWEAXO
           .replace(/\.+$/, '')
           .replace(/_{2,}/g, '_')
           .substring(0, 255);
}

function sayiSoru(soru, callback) {
  const rl = readline;
  const sor = () => {
    rl.question(soru, (cevap) => {
      if (!isNaN(cevap) && cevap.trim() !== '') {// github.com/LWEAXO
        callback(parseInt(cevap));// github.com/LWEAXO
      } else {
        console.log('Lütfen sadece sayı giriniz!'.red.bold);
        sor();
      }
    });
  };
  sor();
}

function centerText(e,t){const a=[...e].length,l=Math.max(0,Math.floor((t-2-a)/2));return" ".repeat(l)+e+" ".repeat(t-2-a-l)}function printDoubleBox(){const e=process.stdout.columns||80,t=Math.min(36,Math.floor(e/2)-2),a=new Date,l=`${a.getDate().toString().padStart(2,"0")}.${(a.getMonth()+1).toString().padStart(2,"0")}.${a.getFullYear()} - ${a.getHours().toString().padStart(2,"0")}:${a.getMinutes().toString().padStart(2,"0")}`,o=["╔".blue.bold+"═".repeat(t-2).blue.bold+"╗".blue.bold,"║".blue.bold+" ".repeat(t-2).blue.bold+"║".blue.bold,"║".blue.bold+centerText("LWEAXO Metin tekrarlayıcı ✈️",t).white.bold+"║".blue.bold,"║".blue.bold+centerText(l,t).gray.bold+"║".blue.bold,"║".blue.bold+" ".repeat(t-2).blue.bold+"║".blue.bold,"╚".blue.bold+"═".repeat(t-2).blue.bold+"╝".blue.bold],b=["╔".magenta.bold+"═".repeat(t-2).magenta.bold+"╗".magenta.bold,"║".magenta.bold+" ".repeat(t-2).magenta.bold+"║".magenta.bold,"║".magenta.bold+centerText("Daha Fazla Proje İçin",t).cyan.bold+"║".magenta.bold,"║".magenta.bold+centerText("GitHub Sayfama Uğrayın",t).yellow.bold+"║".magenta.bold,"║".magenta.bold+centerText("github.com/LWEAXO",t).green.bold+"║".magenta.bold,"╚".magenta.bold+"═".repeat(t-2).magenta.bold+"╝".magenta.bold],n=Math.max(o.length,b.length);for(let e=0;e<n;e++){const a=e<o.length?o[e]:" ".repeat(t),l=e<b.length?b[e]:" ".repeat(t);console.log(a+"  "+l)}}printDoubleBox();

readline.question('Lütfen tekrarlanacak metni girin: '.yellow.bold, (metin) => {// github.com/LWEAXO
  sayiSoru('Kaç kere tekrarlansın: '.blue.bold, (tekrarSayisi) => {
    readline.question('Oluşturulacak dosyanın adı (uzantı olmadan): '.green.bold, (orjinalDosyaAdi) => {
      let dosyaAdi = temizleDosyaAdi(orjinalDosyaAdi);// github.com/LWEAXO
      let formatliDosyaAdi = dosyaAdi + '.txt';
      let orijinalIstek = orjinalDosyaAdi + '.txt';
      
      if (orijinalIstek !== formatliDosyaAdi) {
        console.log(`\nDosya adındaki geçersiz karakterler düzeltildi:`.yellow.bold);
        console.log(`Orijinal istek: ${orijinalIstek}`.red.bold);
        console.log(`Düzeltilmiş ad: ${formatliDosyaAdi}\n`.green.bold);
      }// github.com/LWEAXO
      
      let sonuc = '';
      for (let i = 0; i < tekrarSayisi; i++) {
        sonuc += metin + '\n';
      }
      
      const dosyayaYaz = () => {
        fs.writeFile(formatliDosyaAdi, sonuc, (err) => {
          if (err) {
            console.log(`Dosya oluşturulamadı: ${err.message}`.red);
            const timestamp = new Date().getTime();
            formatliDosyaAdi = `${dosyaAdi}_${timestamp}.txt`;
            console.log(`Alternatif isim deniyorum: ${formatliDosyaAdi}`.cyan.bold);
            dosyayaYaz();
          } else {
            console.log(`
╔═════════════╗\n`.magenta.bold +
`║  `.magenta.bold + `Başarılı!`.green.bold + `  ║\n`.magenta.bold +
`╚═════════════╝\n`.magenta.bold);
            console.log(`"${formatliDosyaAdi}" adlı dosya oluşturuldu.`.green.bold);
            console.log(`Toplam ${tekrarSayisi} kez yazıldı.`.cyan.bold);
            readline.close();
          }
        });
      };
      
      dosyayaYaz();
    });
  });
}); // github.com/LWEAXO