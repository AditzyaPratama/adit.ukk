let dataPeminjaman = [];
let sedangEdit = -1; 
const DENDA_PER_HARI = 5000;
const BATAS_HARI = 14;

const form = document.getElementById("formPeminjaman");
const tabelData = document.getElementById("tabelData");

form.addEventListener("submit", function(e) {
    e.preventDefault();

    const kodePinjam = document.getElementById("kodePinjam").value;
    const nama = document.getElementById("nama").value;
    const isbn = document.getElementById("isbn").value;
    const judul = document.getElementById("judul").value;
    const penerbit = document.getElementById("penerbit").value;
    const tahunTerbit = document.getElementById("tahunTerbit").value;
    const jumlahBuku = document.getElementById("jumlahBuku").value;
    const tanggalPinjam = document.getElementById("tanggalPinjam").value;
    const tanggalKembali = document.getElementById("tanggalKembali").value;

    const pinjamDate = new Date(tanggalPinjam);
    const kembaliDate = new Date(tanggalKembali);

    
    let selisihHari = Math.ceil((kembaliDate - pinjamDate) / (1000 * 60 * 60 * 24));

    let denda = 0;
    let status = "Masih dalam batas waktu";

    if (selisihHari > BATAS_HARI) {
        let hariTelat = selisihHari - BATAS_HARI;
        denda = hariTelat * DENDA_PER_HARI;
        status = "Terlambat " + hariTelat + " hari";
    }

    if (sedangEdit === -1) {
        dataPeminjaman.push({
            kodePinjam,
            nama,
            isbn,
            judul,
            penerbit,
            tahunTerbit,
            jumlahBuku,
            tanggalPinjam,
            tanggalKembali,
            status,
            denda
        });
    } else {
        dataPeminjaman[sedangEdit] = {
            kodePinjam,
            nama,
            isbn,
            judul,
            penerbit,
            tahunTerbit,
            jumlahBuku,
            tanggalPinjam,
            tanggalKembali,
            status,
            denda
        };
        sedangEdit = -1;
    }

    tampilkanData();
    form.reset();
});

function hapusData(index) {
    dataPeminjaman.splice(index, 1);
    tampilkanData();
}

function editData(index) {
    document.getElementById("kodePinjam").value = dataPeminjaman[index].kodePinjam;
    document.getElementById("nama").value = dataPeminjaman[index].nama;
    document.getElementById("isbn").value = dataPeminjaman[index].isbn;
    document.getElementById("judul").value = dataPeminjaman[index].judul;
    document.getElementById("penerbit").value = dataPeminjaman[index].penerbit;
    document.getElementById("tahunTerbit").value = dataPeminjaman[index].tahunTerbit;
    document.getElementById("jumlahBuku").value = dataPeminjaman[index].jumlahBuku;
    document.getElementById("tanggalPinjam").value = dataPeminjaman[index].tanggalPinjam;
    document.getElementById("tanggalKembali").value = dataPeminjaman[index].tanggalKembali;
    
    sedangEdit = index;
}

function tampilkanData() {
    tabelData.innerHTML = "";

    dataPeminjaman.forEach((data, index) => {
        tabelData.innerHTML += `
            <tr>
                <td>${index + 1}</td>
                <td>${data.kodePinjam}</td>
                <td>${data.nama}</td>
                <td>${data.isbn}</td>
                <td>${data.judul}</td>
                <td>${data.penerbit}</td>
                <td>${data.tahunTerbit}</td>
                <td>${data.jumlahBuku}</td>
                <td>${data.tanggalPinjam}</td>
                <td>${data.tanggalKembali}</td>
                <td>${data.status}</td>
                <td class="denda">Rp ${data.denda.toLocaleString()}</td>
                <td>
                    <button class="btn-edit" onclick="editData(${index})">Edit</button>
                    <button class="btn-hapus" onclick="hapusData(${index})">Hapus</button>
                </td>
            </tr>
        `;
    });
}
