# Generated from PS.g4 by ANTLR 4.7
from antlr4 import *
if __name__ is not None and "." in __name__:
    from .PSParser import PSParser
else:
    from PSParser import PSParser

# This class defines a complete listener for a parse tree produced by PSParser.
class PSListener(ParseTreeListener):

    # Enter a parse tree produced by PSParser#math.
    def enterMath(self, ctx:PSParser.MathContext):
        pass

    # Exit a parse tree produced by PSParser#math.
    def exitMath(self, ctx:PSParser.MathContext):
        pass


    # Enter a parse tree produced by PSParser#relation.
    def enterRelation(self, ctx:PSParser.RelationContext):
        pass

    # Exit a parse tree produced by PSParser#relation.
    def exitRelation(self, ctx:PSParser.RelationContext):
        pass


    # Enter a parse tree produced by PSParser#equality.
    def enterEquality(self, ctx:PSParser.EqualityContext):
        pass

    # Exit a parse tree produced by PSParser#equality.
    def exitEquality(self, ctx:PSParser.EqualityContext):
        pass


    # Enter a parse tree produced by PSParser#expr.
    def enterExpr(self, ctx:PSParser.ExprContext):
        pass

    # Exit a parse tree produced by PSParser#expr.
    def exitExpr(self, ctx:PSParser.ExprContext):
        pass


    # Enter a parse tree produced by PSParser#additive.
    def enterAdditive(self, ctx:PSParser.AdditiveContext):
        pass

    # Exit a parse tree produced by PSParser#additive.
    def exitAdditive(self, ctx:PSParser.AdditiveContext):
        pass


    # Enter a parse tree produced by PSParser#mp.
    def enterMp(self, ctx:PSParser.MpContext):
        pass

    # Exit a parse tree produced by PSParser#mp.
    def exitMp(self, ctx:PSParser.MpContext):
        pass


    # Enter a parse tree produced by PSParser#mp_nofunc.
    def enterMp_nofunc(self, ctx:PSParser.Mp_nofuncContext):
        pass

    # Exit a parse tree produced by PSParser#mp_nofunc.
    def exitMp_nofunc(self, ctx:PSParser.Mp_nofuncContext):
        pass


    # Enter a parse tree produced by PSParser#unary.
    def enterUnary(self, ctx:PSParser.UnaryContext):
        pass

    # Exit a parse tree produced by PSParser#unary.
    def exitUnary(self, ctx:PSParser.UnaryContext):
        pass


    # Enter a parse tree produced by PSParser#unary_nofunc.
    def enterUnary_nofunc(self, ctx:PSParser.Unary_nofuncContext):
        pass

    # Exit a parse tree produced by PSParser#unary_nofunc.
    def exitUnary_nofunc(self, ctx:PSParser.Unary_nofuncContext):
        pass


    # Enter a parse tree produced by PSParser#postfix.
    def enterPostfix(self, ctx:PSParser.PostfixContext):
        pass

    # Exit a parse tree produced by PSParser#postfix.
    def exitPostfix(self, ctx:PSParser.PostfixContext):
        pass


    # Enter a parse tree produced by PSParser#postfix_nofunc.
    def enterPostfix_nofunc(self, ctx:PSParser.Postfix_nofuncContext):
        pass

    # Exit a parse tree produced by PSParser#postfix_nofunc.
    def exitPostfix_nofunc(self, ctx:PSParser.Postfix_nofuncContext):
        pass


    # Enter a parse tree produced by PSParser#postfix_op.
    def enterPostfix_op(self, ctx:PSParser.Postfix_opContext):
        pass

    # Exit a parse tree produced by PSParser#postfix_op.
    def exitPostfix_op(self, ctx:PSParser.Postfix_opContext):
        pass


    # Enter a parse tree produced by PSParser#eval_at.
    def enterEval_at(self, ctx:PSParser.Eval_atContext):
        pass

    # Exit a parse tree produced by PSParser#eval_at.
    def exitEval_at(self, ctx:PSParser.Eval_atContext):
        pass


    # Enter a parse tree produced by PSParser#eval_at_sub.
    def enterEval_at_sub(self, ctx:PSParser.Eval_at_subContext):
        pass

    # Exit a parse tree produced by PSParser#eval_at_sub.
    def exitEval_at_sub(self, ctx:PSParser.Eval_at_subContext):
        pass


    # Enter a parse tree produced by PSParser#eval_at_sup.
    def enterEval_at_sup(self, ctx:PSParser.Eval_at_supContext):
        pass

    # Exit a parse tree produced by PSParser#eval_at_sup.
    def exitEval_at_sup(self, ctx:PSParser.Eval_at_supContext):
        pass


    # Enter a parse tree produced by PSParser#exp.
    def enterExp(self, ctx:PSParser.ExpContext):
        pass

    # Exit a parse tree produced by PSParser#exp.
    def exitExp(self, ctx:PSParser.ExpContext):
        pass


    # Enter a parse tree produced by PSParser#exp_nofunc.
    def enterExp_nofunc(self, ctx:PSParser.Exp_nofuncContext):
        pass

    # Exit a parse tree produced by PSParser#exp_nofunc.
    def exitExp_nofunc(self, ctx:PSParser.Exp_nofuncContext):
        pass


    # Enter a parse tree produced by PSParser#comp.
    def enterComp(self, ctx:PSParser.CompContext):
        pass

    # Exit a parse tree produced by PSParser#comp.
    def exitComp(self, ctx:PSParser.CompContext):
        pass


    # Enter a parse tree produced by PSParser#comp_nofunc.
    def enterComp_nofunc(self, ctx:PSParser.Comp_nofuncContext):
        pass

    # Exit a parse tree produced by PSParser#comp_nofunc.
    def exitComp_nofunc(self, ctx:PSParser.Comp_nofuncContext):
        pass


    # Enter a parse tree produced by PSParser#group.
    def enterGroup(self, ctx:PSParser.GroupContext):
        pass

    # Exit a parse tree produced by PSParser#group.
    def exitGroup(self, ctx:PSParser.GroupContext):
        pass


    # Enter a parse tree produced by PSParser#abs_group.
    def enterAbs_group(self, ctx:PSParser.Abs_groupContext):
        pass

    # Exit a parse tree produced by PSParser#abs_group.
    def exitAbs_group(self, ctx:PSParser.Abs_groupContext):
        pass


    # Enter a parse tree produced by PSParser#atom.
    def enterAtom(self, ctx:PSParser.AtomContext):
        pass

    # Exit a parse tree produced by PSParser#atom.
    def exitAtom(self, ctx:PSParser.AtomContext):
        pass


    # Enter a parse tree produced by PSParser#mathit.
    def enterMathit(self, ctx:PSParser.MathitContext):
        pass

    # Exit a parse tree produced by PSParser#mathit.
    def exitMathit(self, ctx:PSParser.MathitContext):
        pass


    # Enter a parse tree produced by PSParser#mathit_text.
    def enterMathit_text(self, ctx:PSParser.Mathit_textContext):
        pass

    # Exit a parse tree produced by PSParser#mathit_text.
    def exitMathit_text(self, ctx:PSParser.Mathit_textContext):
        pass


    # Enter a parse tree produced by PSParser#frac.
    def enterFrac(self, ctx:PSParser.FracContext):
        pass

    # Exit a parse tree produced by PSParser#frac.
    def exitFrac(self, ctx:PSParser.FracContext):
        pass


    # Enter a parse tree produced by PSParser#func_normal.
    def enterFunc_normal(self, ctx:PSParser.Func_normalContext):
        pass

    # Exit a parse tree produced by PSParser#func_normal.
    def exitFunc_normal(self, ctx:PSParser.Func_normalContext):
        pass


    # Enter a parse tree produced by PSParser#func.
    def enterFunc(self, ctx:PSParser.FuncContext):
        pass

    # Exit a parse tree produced by PSParser#func.
    def exitFunc(self, ctx:PSParser.FuncContext):
        pass


    # Enter a parse tree produced by PSParser#args.
    def enterArgs(self, ctx:PSParser.ArgsContext):
        pass

    # Exit a parse tree produced by PSParser#args.
    def exitArgs(self, ctx:PSParser.ArgsContext):
        pass


    # Enter a parse tree produced by PSParser#limit_sub.
    def enterLimit_sub(self, ctx:PSParser.Limit_subContext):
        pass

    # Exit a parse tree produced by PSParser#limit_sub.
    def exitLimit_sub(self, ctx:PSParser.Limit_subContext):
        pass


    # Enter a parse tree produced by PSParser#func_arg.
    def enterFunc_arg(self, ctx:PSParser.Func_argContext):
        pass

    # Exit a parse tree produced by PSParser#func_arg.
    def exitFunc_arg(self, ctx:PSParser.Func_argContext):
        pass


    # Enter a parse tree produced by PSParser#func_arg_noparens.
    def enterFunc_arg_noparens(self, ctx:PSParser.Func_arg_noparensContext):
        pass

    # Exit a parse tree produced by PSParser#func_arg_noparens.
    def exitFunc_arg_noparens(self, ctx:PSParser.Func_arg_noparensContext):
        pass


    # Enter a parse tree produced by PSParser#subexpr.
    def enterSubexpr(self, ctx:PSParser.SubexprContext):
        pass

    # Exit a parse tree produced by PSParser#subexpr.
    def exitSubexpr(self, ctx:PSParser.SubexprContext):
        pass


    # Enter a parse tree produced by PSParser#supexpr.
    def enterSupexpr(self, ctx:PSParser.SupexprContext):
        pass

    # Exit a parse tree produced by PSParser#supexpr.
    def exitSupexpr(self, ctx:PSParser.SupexprContext):
        pass


    # Enter a parse tree produced by PSParser#subeq.
    def enterSubeq(self, ctx:PSParser.SubeqContext):
        pass

    # Exit a parse tree produced by PSParser#subeq.
    def exitSubeq(self, ctx:PSParser.SubeqContext):
        pass


    # Enter a parse tree produced by PSParser#supeq.
    def enterSupeq(self, ctx:PSParser.SupeqContext):
        pass

    # Exit a parse tree produced by PSParser#supeq.
    def exitSupeq(self, ctx:PSParser.SupeqContext):
        pass


