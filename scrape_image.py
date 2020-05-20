from bs4 import BeautifulSoup
from splinter import Browser
import time
import requests

def init_browser():
    executable_path = {"executable_path": "chromedriver"}
    return Browser("chrome", **executable_path, headless=False, incognito=True)

# browser = init_browser()
# browser.quit()

def quit_browser(browser):
    browser.quit()


def scrape_image(recipe_id, browser):
    print("browser opened")
    website_url = f"https://www.food.com/recipe-{recipe_id}"
    browser.visit(website_url)
    # time.sleep(1)
    website_html = browser.html
    website_soup = BeautifulSoup(website_html, "html.parser")
    print("html parsed")
    website_results = website_soup.find("div", class_="inner-wrapper")
    
    try:
        picture_url = website_results.img["data-src"]
        print("Picture found!!!")
        return picture_url
    
    except:
        flag = False
        attempts = 100
        for i in range(attempts):
            try:
#                 time.sleep(1)
                website_html = browser.html
                print(f"Retry {i+1}")
                website_soup = BeautifulSoup(website_html, "html.parser")
                print("New html parsed")
                website_results = website_soup.find("div", class_="inner-wrapper")
                picture_url = website_results.img["data-src"]
                print("Picture found!!!")
                flag = True
            except:
                print(f"Attempt {i+1} failed")
            
            if i == attempts - 1:
                return None
            if flag:
                break
        return picture_url
    
# browser = init_browser()
# scrape_image(39087, browser)
# scrape_image(2886, browser)
# scrape_image(27208, browser)
# quit_browser(browser)