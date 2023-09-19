const { sum } = require('./practice');

test(
    // parameter untuk deskripsi
    "Make sure that 1 + 1 = 2",
    // parameter untuk testing yang sebenarnya
    () => {
        expect(
            // expect hasil dari function/value yang kita jalankan di bawah ini
            sum(
                1,1
            ))
            // toBe sama dengan nilai yang kita harapkan, yakni 6
            .toBe(2)
    }
)