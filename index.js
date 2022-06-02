import { getPlaiceholder } from "plaiceholder";
import childProcess from "child_process";
import { Spinner } from "cli-spinner";

const imgURL = process.argv.slice(2)[0];

async function plaiceHolder(url) {
  const spinner = new Spinner("creating placeholder... %s");

  spinner.setSpinnerString("|/-\\");
  spinner.start();
  try {
    const { base64: data } = await getPlaiceholder(url);
    spinner.stop(true);
    console.log("\n");
    console.log("adding placeholder to your clipboard... \n");

    const pbCopy = childProcess.spawn("pbcopy");
    pbCopy.stdin.write(data);
    pbCopy.stdin.end(() => {
      console.log(">>>", "\x1b[33m", `${data}`);
      console.log("\x1b[34m", "has been added to your clipboard \n");
    });
  } catch (err) {
    spinner.stop(false);
    console.log("\x1b[31m", "There has been an error -> \n");
    console.log("Error :", err);
  }
}

plaiceHolder(imgURL);
