$(document).ready(function () {
    // Hide error icons by default
    $('.error-icon').hide();

    $('#taxForm').submit(function (event) {
        event.preventDefault();

        // Reset error states
        $('.error-icon').hide();
        $('.form-control').removeClass('is-invalid');

        // Get input values
        var age = $('#age').val();
        var income = parseFloat($('#income').val());
        var extraIncome = parseFloat($('#extraIncome').val());
        var deductions = parseFloat($('#deductions').val());

        // Validate inputs
        var valid = true;
        if (!age) {
            $('#age').addClass('is-invalid');
            $('#ageErrorIcon').show().attr('title', 'Age is required');
            valid = false;
        }
        if (isNaN(income) || income < 0) {
            $('#income').addClass('is-invalid');
            if (!income) {
                $('#incomeErrorIcon').show().attr('title', 'Income value is required');
            } else {
                $('#incomeErrorIcon').show().attr('title', 'Invalid income value');
            }
            valid = false;
        }
        if (isNaN(extraIncome) || extraIncome < 0) {
            $('#extraIncome').addClass('is-invalid');
            if (!extraIncome) {
                $('#extraIncomeErrorIcon').show().attr('title', 'Extra income value is required');
            } else {
                $('#extraIncomeErrorIcon').show().attr('title', 'Invalid extra income value');
            }
            valid = false;
        }
        if (isNaN(deductions) || deductions < 0) {
            $('#deductions').addClass('is-invalid');
            if (!deductions) {
                $('#deductionsErrorIcon').show().attr('title', 'Deductions value is required');
            } else {
                $('#deductionsErrorIcon').show().attr('title', 'Invalid deductions value');
            }
            valid = false;
        }

        if (valid) {
            // Calculate total income
            var totalIncome = income + extraIncome - deductions;

            // Calculate tax
            var tax = 0;
            if (totalIncome > 8) {
                switch (age) {
                    case '<40':
                        tax = 0.3 * (totalIncome - 8);
                        break;
                    case '>=40&<60':
                        tax = 0.4 * (totalIncome - 8);
                        break;
                    case '>=60':
                        tax = 0.1 * (totalIncome - 8);
                        break;
                }
            }

            // Show result modal
            $('#overallIncome').text('Overall Income: ' + totalIncome.toFixed(2) + ' Lakhs');
            $('#taxToBePaid').text('Tax to be Paid: ' + tax.toFixed(2) + ' Lakhs');
            $('#resultModal').modal('show');
        }
    });

    // Prevent non-numeric input for number fields
    $('input[type="text"]').on('input', function () {
        this.value = this.value.replace(/[^0-9.]/g, '');
    });

    // Show error explanation on error icon click
    $('.error-icon').click(function () {
        var errorExplanation = $(this).attr('title');
        if (errorExplanation) {
            alert(errorExplanation);
        }
    });
});
