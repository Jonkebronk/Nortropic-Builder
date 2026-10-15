// Svenska postnummer skrivs med mellanslag (217 43) men ska inte brytas mellan två rader, så mellanslaget blir hårt.
export const hartPostnummer = (s: string) => s.replace(/\b(\d{3}) (\d{2})\b/g, '$1 $2');
