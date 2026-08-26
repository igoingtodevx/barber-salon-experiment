import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const htmlPath = resolve(__dirname, 'index.html');

console.log('--- STARTING ANTI-AI-SLOP BARBER QUALITY AUDIT ---');

// 1. File existence & size
assert.ok(existsSync(htmlPath), 'index.html must exist');
const htmlContent = readFileSync(htmlPath, 'utf8');
assert.ok(htmlContent.length > 5000, `index.html is too small (${htmlContent.length} bytes)`);

// 2. Identity Carrier & Siegen Location Verification
console.log('✓ Checking Siegen Oberstadt identity & location anchors...');
assert.ok(htmlContent.includes('Löhrstraße 31'), 'Must contain exact Siegen address: Löhrstraße 31');
assert.ok(htmlContent.includes('57072 Siegen'), 'Must contain Siegen postal code 57072');
assert.ok(htmlContent.includes('Krönchen'), 'Must contain Siegen landmark: Krönchen / Nikolaikirche');
assert.ok(htmlContent.includes('Parkhaus Altstadt'), 'Must contain verified parking location: Parkhaus Altstadt');
assert.ok(htmlContent.includes('0271 238 910') || htmlContent.includes('271 238 910'), 'Must contain verified Siegen area code phone (+49 271)');

// 3. Anti-Slop Aesthetics Checks
console.log('✓ Verifying Anti-Slop layout rules (Zero generic cards, Zero rounded-full pills, Zero AI sparkles)...');
assert.ok(!htmlContent.includes('rounded-full bg-white shadow-lg'), 'Violates anti-slop rule: generic card containers banned');
assert.ok(!htmlContent.includes('✨'), 'Violates anti-slop rule: AI sparkles emoji banned');
assert.ok(htmlContent.includes('data-theme="light"'), 'Must have root dual-theme token attribute');
assert.ok(htmlContent.includes('Cinzel'), 'Must include monolithic display typography');
assert.ok(htmlContent.includes('Cormorant Garamond'), 'Must include literary editorial typography');
assert.ok(htmlContent.includes('JetBrains Mono'), 'Must include Swiss telemetry font');

// 4. Honest Pricing & Service Matrix
console.log('✓ Auditing honest service matrix (Price in EUR & Duration in Min for every item)...');
const requiredServices = [
  { name: 'Der Oberstadt-Haarschnitt', price: '42 €', duration: '45 Min' },
  { name: 'Traditionelle Klingenrasur', price: '36 €', duration: '40 Min' },
  { name: 'Bartform & Kantenarchitektur', price: '28 €', duration: '30 Min' },
  { name: 'Das Siegerländer Meister-Ritual', price: '72 €', duration: '75 Min' },
  { name: 'Kopfhaut-Tiefenreinigung', price: '22 €', duration: '20 Min' },
  { name: 'Grau-Nuancierung', price: '26 €', duration: '25 Min' }
];

for (const s of requiredServices) {
  assert.ok(htmlContent.includes(s.name), `Service missing: ${s.name}`);
  assert.ok(htmlContent.includes(s.price), `Price missing for service: ${s.name} (${s.price})`);
  assert.ok(htmlContent.includes(s.duration), `Duration missing for service: ${s.name} (${s.duration})`);
}

// 5. Booking Engine & Fallbacks
console.log('✓ Validating interactive booking engine & failover mechanisms...');
assert.ok(htmlContent.includes('id="booking-modal"'), 'Booking modal container missing');
assert.ok(htmlContent.includes('downloadCalendarIcs'), 'ICS calendar generator function missing');
assert.ok(htmlContent.includes('sendBookingViaWhatsApp'), 'WhatsApp confirmation bridge missing');
assert.ok(htmlContent.includes('localStorage.setItem(\'ek_saved_bookings\''), 'Local persistence of bookings missing');
assert.ok(htmlContent.includes('EK-2026-'), 'Booking reference code format missing');

// 6. German Legal Compliance (§ 5 DDG & DSGVO)
console.log('✓ Checking German legal compliance (§ 5 DDG / TMG Impressum & DSGVO)...');
assert.ok(htmlContent.includes('Digitale-Dienste-Gesetz') || htmlContent.includes('§ 5 DDG'), 'Impressum must reference § 5 DDG');
assert.ok(htmlContent.includes('Handwerkskammer Arnsberg'), 'Must reference competent chamber: Handwerkskammer Arnsberg');
assert.ok(htmlContent.includes('Friseurmeister'), 'Must declare legal professional title: Friseurmeister');
assert.ok(htmlContent.includes('Datenschutzerklärung (DSGVO)'), 'Must include DSGVO privacy notice');

console.log('---');
console.log('ALL 6 QUALITY GATES PASSED: 100% COMPLIANT WITH ANTI-AI-SLOP BUILD SHEET STANDARDS.');
