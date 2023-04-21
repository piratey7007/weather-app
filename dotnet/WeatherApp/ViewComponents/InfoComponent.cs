using Microsoft.AspNetCore.Mvc;

public class InfoComponent : ViewComponent
{
    public async Task<IViewComponentResult> InvokeAsync()
    {
        return View();
    }
}