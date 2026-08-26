import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const htmlPath = resolve(__dirname, 'index.html');

console.log('--- A4 BUILD SHEET COMPLIANCE AUDIT ---');

assert.ok(existsSync(htmlPath), 'index.html must exist');
const html = readFileSync(htmlPath, 'utf8');

// 1. Anti-Slop Check: No pseudo-telemetry labels, no AI sparkles, no generic shadow cards
assert.ok(!html.includes('✨'), 'Anti-slop violation: Sparkles banned');
assert.ok(!html.includes('rounded-full bg-white shadow-lg'), 'Anti-slop violation: Generic card container banned');
assert.ok(!html.includes('FIELD NOTE'), 'Anti-slop violation: Faux telemetry banned');

// 2. Real Location in Siegen
assert.ok(html.includes('Löhrstraße 31'), 'Must include exact Siegen address');
assert.ok(html.includes('57072 Siegen'), 'Must include Siegen postal code');
assert.ok(html.includes('Parkhaus Altstadt'), 'Must include real Siegen parking info');
assert.ok(html.includes('+49 (0) 271 238 910'), 'Must include real Siegen phone contact');

// 3. Service & Pricing Matrix
assert.ok(html.includes('42,00 €'), 'Must declare clear price for Haarschnitt');
assert.ok(html.includes('36,00 €'), 'Must declare clear price for Rasur');
assert.ok(html.includes('28,00 €'), 'Must declare clear price for Bart');

// 4. Functional booking flow
assert.ok(html.includes('downloadIcsFile'), 'Must support ICS calendar download');
assert.ok(html.includes('sendWhatsAppConfirmation'), 'Must support WhatsApp confirmation');

console.log('PASS: 100% compliant with strict DIN A4 Build Sheet.');
