

$('.habit-status-dropdown').on('change',function()
{

    let id=this.id
    let status=$(this).val();

    window.location.href = `http://localhost:8000/habits/toggleStatus?id=${id}&status=${status}`;
})