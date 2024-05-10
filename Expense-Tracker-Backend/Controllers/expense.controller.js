const Expense = require("../Models/expense.model");
const User = require("../Models/user.model");
const S3Services = require("../Services/s3Services");

exports.downloadexpense = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const expenseall = await Expense.find({ userId: userId });
    const stringifiedData = JSON.stringify(expenseall);
    const filename = `Expense${userId}/${new Date()}.txt`;
    const fileUrl = await S3Services.uploadToS3(stringifiedData, filename);
    const downloadData = {
      fileUrl: fileUrl,
    };
    await User.findByIdAndUpdate(userId, {
      $push: { downloads: downloadData },
    });
    res.status(200).json({ fileUrl, success: true });
  } catch (err) {
    res.status(500).json({ fileUrl: "", success: false, err: err });
  }
};

exports.getlistofdownloads = async (req, res) => {
  const item = await User.findById(req.user._id).select("downloads");
  res.status(200).json({ allDownloads: item });
};

exports.getexpense = async (req, res, next) => {
  const page = +req.query.page || 1;
  const Itemslim = +req.query.lim || 6;
  const data = await Expense.find({
    userId: req.user.id,
    //offset:(page-1)*Itemslim,
    //limit:Itemslim
  })
    .skip((page - 1) * Itemslim)
    .limit(Itemslim);
  res.status(200).json({
    allExpense: data,
    ispremium: req.user.ispremiuimuser,
    currPage: page,
    hasPreviousPage: page > 1,
    hasLastPage: data.length > 1,
  });
};

exports.addexpense = async (req, res, next) => {
  try {
    const price = Number(req.body.amount);
    const description = req.body.description;
    const category = req.body.category;
    const id = req.user._id;
    const oldexpense = req.user.totalExpense;
    const expense = new Expense({
      amount: price,
      description: description,
      category: category,
      userId: id,
    });
    await User.findByIdAndUpdate(id, { totalExpense: oldexpense + price });
    await expense.save();
    res.status(201).json({ newExpense: expense });
  } catch (e) {
    res.status(400).json({ e });
  }
};

exports.deleteexpense = async (req, res, next) => {
  const expenseid = req.params.id;
  const oldexpense = req.user.totalExpense;
  try {
    const exp = await Expense.findByIdAndDelete(expenseid);
    await User.findByIdAndUpdate(exp.userId, {
      totalExpense: oldexpense - exp.amount,
    });
    res.status(200).json({ exp });
  } catch (e) {
    res.status(500).json({ message: e });
  }
};
