using Microsoft.AspNetCore.Mvc;

public class NavComponent : ViewComponent
{
    public async Task<IViewComponentResult> InvokeAsync()
    {
        return View();
    }
}