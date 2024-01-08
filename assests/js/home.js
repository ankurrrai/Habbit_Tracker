

$('.habit-status-dropdown').on('change',function()
{

    let id=this.id
    let status=$(this).val();

    window.location.href = `https://habbit-tracker-9lme.onrender.com/habits/toggleStatus?id=${id}&status=${status}`;
})