// scrape.js
import puppeteer from 'puppeteer';
import axios from 'axios';
import tough from 'tough-cookie';
import { wrapper } from 'axios-cookiejar-support';

/**
 * @param {string} nama Nama produk
 * @param {string} bentuk Bentuk sediaan
 */
export default async function scrapeBPOM(nama, bentuk) {
  const browser = await puppeteer.launch({ 
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
  const page = await browser.newPage();

  await page.goto('https://cekbpom.pom.go.id/produk-obat', {
    waitUntil: 'networkidle2'
  });

  const csrfToken = await page.$eval('meta[name="csrf-token"]', el => el.content);
  const cookies = await page.cookies();
  await browser.close();

  const jar = new tough.CookieJar();
  for (const cookie of cookies) {
    const toughCookie = new tough.Cookie({
      key: cookie.name,
      value: cookie.value,
      domain: 'cekbpom.pom.go.id',
      httpOnly: cookie.httpOnly,
      secure: cookie.secure,
      expires: new Date(cookie.expires * 1000),
      path: cookie.path,
    });
    jar.setCookieSync(toughCookie, 'https://cekbpom.pom.go.id');
  }

  const client = wrapper(axios.create({ jar }));

  const payload = new URLSearchParams({
    draw: 1,
    'columns[0][data]': 'PRODUCT_ID',
    'columns[0][searchable]': 'false',
    'columns[0][orderable]': 'false',
    'columns[1][data]': 'PRODUCT_REGISTER',
    'columns[1][searchable]': 'false',
    'columns[1][orderable]': 'false',
    'columns[2][data]': 'PRODUCT_NAME',
    'columns[2][searchable]': 'true',
    'columns[2][orderable]': 'false',
    'columns[3][data]': 'MANUFACTURER_NAME',
    'columns[3][searchable]': 'false',
    'columns[3][orderable]': 'false',
    'order[0][column]': '0',
    'order[0][dir]': 'asc',
    start: '0',
    length: '100',
    'search[value]': nama,
    'search[regex]': 'false',
    product_name: '',
    product_form: '',
  });

  const res = await client.post(
    'https://cekbpom.pom.go.id/produk-dt/01',
    payload.toString(),
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'X-CSRF-TOKEN': csrfToken,
      },
    }
  );

  return res.data;
}

// export default scrapeBPOM;
