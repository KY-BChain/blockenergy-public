const provider = new ethers.providers.Web3Provider(window.ethereum);
let signer, docRegistry;
const ipfs = window.IpfsHttpClient.create({ host: 'localhost', port: 5001, protocol: 'http' });

async function init() {
  await provider.send('eth_requestAccounts', []);
  signer = provider.getSigner();
  const addr = '<<DocumentRegistry address>>';
  const abi  = [ 'function submitDocument(string, string) external returns (bytes32)' ];
  docRegistry = new ethers.Contract(addr, abi, signer);

  document.getElementById('uploadBtn').onclick = submitDocument;
}

async function submitDocument() {
  const file = document.getElementById('fileInput').files[0];
  const type = document.getElementById('docType').value;
  const status = document.getElementById('status');

  status.textContent = 'Uploading to IPFS…';
  const added = await ipfs.add(file);
  status.textContent = `IPFS CID: ${added.path}\nSubmitting to blockchain…`;

  const tx = await docRegistry.submitDocument(type, added.path);
  await tx.wait();
  status.textContent += `\nTransaction confirmed: ${tx.hash}`;
}

window.onload = init;
