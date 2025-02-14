import puppeteer, { Page, Browser } from "puppeteer";
import { wait } from "./utils/wait";
import { getSpansInDiv } from "./utils/getSpansInDiv";

async function startBot() {
  let browser: Browser | null = null;

  try {
    console.log("Bot starting");

    browser = await puppeteer.launch({
      headless: false,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    console.log("Bot started");
    const page: Page = await browser.newPage();

    await page.goto("https://10fastfingers.com/typing-test/french");

    const iframeSelector = 'iframe[title="SP Consent Message"]';

    await page.waitForSelector(iframeSelector, { visible: true });

    const iframeElementHandle = await page.$(iframeSelector);

    const iframe = await iframeElementHandle?.contentFrame();

    const buttonSelector =
      "button.message-component.message-button.no-children.focusable.sp_choice_type_11.last-focusable-el";

    const buttonElement = await iframe.waitForSelector(buttonSelector, {
      visible: true,
    });

    await buttonElement.click();

    const input = await page.waitForSelector("input.form-control", {
      visible: true,
    });

    const wordList = await getSpansInDiv(page, "#row1");

    console.log(wordList);

    for (const word of wordList) {
      console.log("Mot à écrire :", word);
      await input.type(word);
      await input.press("Space");
      await wait(20);
    }
  } catch (error) {
    console.error("Erreur du bot :", error);
  } finally {
    setTimeout(() => browser?.close(), 60000); // Fermer le navigateur au bout de 60 secondes
  }
}

startBot();
